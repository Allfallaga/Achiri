const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mediasoup = require('mediasoup')
const app = express()
const fs = require('fs')
const http = require('https');
const ssl = {
    key: fs.readFileSync('../ssl/key.pem', 'utf-8'),
    cert: fs.readFileSync('../ssl/cert.crt', 'utf-8'),
}
const server = http.Server(ssl, app);
const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
})


app.use(cors())
// server.listen(8085)
server.listen(3002)

let worker
const webRtcTransport_options = {
    listenIps: [
        {
            ip: '127.0.0.1', // replace with relevant IP address
            ip: process.env.DOMAIN, // replace with relevant IP address
        }
    ],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
}
let rooms = {}
let peers = {}
let transports = []     // [ { socketId1, roomName1, transport, consumer }, ... ]
let producers = []      // [ { socketId1, roomName1, producer, }, ... ]
let consumers = []      // [ { socketId1, roomName1, consumer, }, ... ]
let userInfos = {}

const mediaCodecs = [
    {
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2,
    },
    {
        kind: 'video',
        mimeType: 'video/VP8',
        clockRate: 90000,
        parameters: {
            'x-google-start-bitrate': 1000,
        },
    },
    {
        kind: 'video',
        mimeType: 'video/VP9',
        clockRate: 90000,
        parameters: {
            'x-google-start-bitrate': 1000,
        },
    },
    {
        kind: "video",
        mimeType: "video/H264",
        clockRate: 90000,
        parameters:
        {
            "packetization-mode": 1,
            "profile-level-id": "42e01f",
            "level-asymmetry-allowed": 1
        }
    }
]

const setupServer = async () => {
    worker = await mediasoup.createWorker()
    worker.on('died', error => {
        // This implies something serious happened, so kill the application
        console.error('mediasoup worker has died')
        setTimeout(() => process.exit(1), 2000) // exit in 2 seconds
    })

    return worker
}

worker = setupServer()

const createRoom = async (roomName, socket, connectedEmail) => {
    let routerTmp
    let peers = []
    let emails = []
    if (rooms[roomName]) {
        routerTmp = rooms[roomName].router
        peers = rooms[roomName].peers || []
        emails = rooms[roomName].emails || []
    } else {
            routerTmp = await worker.createRouter({ mediaCodecs })
    }
    if (emails.filter(email => email == connectedEmail).length > 0) {
        socket.emit('duplicate-user', { exists: true })
    } else {
        socket.emit('duplicate-user', { exists: false })
    }
    emails = emails.filter(email => email !== connectedEmail)
    // console.log('created a router ', routerTmp.id + ' peers : ' + peers.length)
    rooms[roomName] = {
        router: routerTmp,
        peers: [...peers, socket.id],
        emails: [...emails, connectedEmail]
    }

    return routerTmp
}

const createTransports = async (router) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transport = await router.createWebRtcTransport(webRtcTransport_options)
            console.log('transport created')

            transport.on('dtlsstatechange', dtlsState => {
                if (dtlsState === 'closed') {
                    transport.close()
                }
            })

            transport.on('close', () => {
                console.log('transport closed')
            })

            resolve(transport)

        } catch (error) {
            reject(error)
        }
    })
}

const addTransport = (transport, roomName, consumer, socketId) => {
    transports = [
        ...transports,
        { socketId, transport, roomName, consumer }
    ]

    peers[socketId] = {
        ...peers[socketId],
        transports: [
            ...peers[socketId].transports,
            transport.id,
        ]
    }
}

const getTransport = (socketId) => {
    //Finds the send transport of a user determined by its socket
    const [producerTransport] = transports.filter(transport => transport.socketId === socketId && !transport.consumer)
    return producerTransport.transport
}

const addProducer = (producer, roomName, socketId) => {
    producers = [
        ...producers,
        { socketId, producer, roomName }
    ]

    peers[socketId] = {
        ...peers[socketId],
        producers: [
            ...peers[socketId].producers,
            producer.id,
        ]
    }
}

const informConsumers = (roomName, socketId, id, kind) => {
    // Inform all consumers to consume this producer
    // Loop through all producers and signal to create a new consumer in client side
    producers.forEach(producer => {
        if (producer.socketId !== socketId && producer.roomName == roomName && producer.producer.kind == kind) {
            const producerSocket = peers[producer.socketId].socket
            console.log("new producer ", { id, socketId })
            // Emit to all the users except for the actual producer that he Joined
            producerSocket.emit('new-producer', { producerId: id })
        }
    })
}

const addConsumer = (consumer, roomName, socketId) => {
    // add the consumer to the consumers list
    consumers = [
        ...consumers,
        { socketId, consumer, roomName, }
    ]

    // add the consumer id to the peers list
    peers[socketId] = {
        ...peers[socketId],
        consumers: [
            ...peers[socketId].consumers,
            consumer.id,
        ]
    }
}

io.on('connection', async (socket) => {
    socket.emit('connection-success', {
        socketId: socket.id
    })

    socket.on('joinRoom', async ({ roomName, user, isAdmin }, callback) => {
        // console.log('joinRoom ', user)
        userInfos = user
        const routerTmp = await createRoom(roomName, socket, user.email)
        peers[socket.id] = {
            socket,
            roomName,
            transports: [],
            producers: [],
            consumers: [],
            peerDetails: {
                id: user.id,
                nickname: user.nickname,
                email: user.email,
                avatar: user.avatar,
                isAdmin: isAdmin
            }
        }
        const rtpCapabilities = routerTmp.rtpCapabilities

        // send back RTP Capabilities of the router to the client
        callback({ rtpCapabilities })
    })

    socket.on('createWebRtcTransport', async ({ consumer }, callback) => {
        // console.log('createWebRtcTransport')
        // get Room Name from Peer's properties
        const roomName = peers[socket.id].roomName
        // get Router (Room) object from roomName
        const router = rooms[roomName].router
        createTransports(router).then(
            transport => {
                callback({
                    params: {
                        id: transport.id,
                        iceParameters: transport.iceParameters,
                        iceCandidates: transport.iceCandidates,
                        dtlsParameters: transport.dtlsParameters,
                    }
                })
                addTransport(transport, roomName, consumer, socket.id)
            },
            error => {
                console.log(error)
            }
        )
    })

    socket.on('transport-connect', ({ dtlsParameters }) => {
        getTransport(socket.id).connect({ dtlsParameters })
    })

    socket.on('transport-produce', async ({ kind, rtpParameters, appData }, callback) => {
        console.log('transport-produce');
        const producer = await getTransport(socket.id).produce({
            kind,
            rtpParameters
        })

        const { roomName } = peers[socket.id]

        addProducer(producer, roomName, socket.id)

        // Trigger consumption for all the users connected (consumers)
        informConsumers(roomName, socket.id, producer.id, producer.kind)

        producer.on('transportclose', () => {
            console.log('transport for this producer closed ')
            producer.close()
        })
        // Send back to the client the Producer's id
        callback({
            id: producer.id,
            producersExist: producers.length > 1 ? true : false
        })
    })

    socket.on('producers-exist', async (callback) => {
        callback({
            producersExist: producers.length > 1 ? true : false
        })
    })

    socket.on('transport-recv-connect', async ({ dtlsParameters, serverConsumerTransportId }) => {
        // console.log(`transport-recv-connect: ${dtlsParameters}`)
        const consumerTransport = transports.find(transportData => (
            transportData.consumer && transportData.transport.id == serverConsumerTransportId
        )).transport
        await consumerTransport.connect({ dtlsParameters })
    })

    socket.on('getProducers', callback => {
        console.log('getProducers')
        //return all producer transports
        const { roomName } = peers[socket.id]

        let producerList = []
        producers.forEach(producerData => {
            if (producerData.socketId !== socket.id && producerData.roomName === roomName) {
                producerList = [...producerList, producerData.producer.id]
            }
        })

        // return the producer list back to the client
        callback(producerList)
    })

    socket.on('consume', async ({ rtpCapabilities, remoteProducerId, serverConsumerTransportId }, callback) => {
        console.log('consume');
        try {
            const { roomName } = peers[socket.id]
            const router = rooms[roomName].router

            let consumerTransport = transports.find(transportData => (
                transportData.consumer && transportData.transport.id == serverConsumerTransportId
            )).transport

            // console.log('remote producer id : ', remoteProducerId)
            // console.log('rtp capabilities   : ', rtpCapabilities)
            // console.log(router.canConsume({ producerId: remoteProducerId, rtpCapabilities }))
            if (router.canConsume({
                producerId: remoteProducerId,
                rtpCapabilities
            })) {
                console.log('consuming ...............')
                const consumer = await consumerTransport.consume({
                    producerId: remoteProducerId,
                    rtpCapabilities,
                    paused: true,
                })
                consumer.on('transportclose', () => {
                    console.log('transport close from consumer')
                })

                consumer.on('producerclose', () => {

                    // let remoteProducerSocketId = producers.filter(prod => prod.producer.id === remoteProducerId)
                    socket.emit('producer-closed', { remoteProducerId })

                    consumerTransport.close([])
                    transports = transports.filter(transportData => transportData.transport.id !== consumerTransport.id)
                    consumer.close()
                    consumers = consumers.filter(consumerData => consumerData.consumer.id !== consumer.id)
                })

                addConsumer(consumer, roomName, socket.id)

                // from the consumer extract the following params
                // to send back to the Client
                const params = {
                    id: consumer.id,
                    producerId: remoteProducerId,
                    kind: consumer.kind,
                    rtpParameters: consumer.rtpParameters,
                    serverConsumerId: consumer.id,
                }
                let remoteProducerSocketId = producers.filter(item => item.producer.id == remoteProducerId)[0].socketId

                // send the parameters to the client
                callback({ params, socketId: remoteProducerSocketId, isAdmin: peers[remoteProducerSocketId].peerDetails.isAdmin })
            }
        } catch (error) {
            console.log(error.message)
            callback({
                params: {
                    error: error
                }
            })
        }
    })

    socket.on('consumer-resume', async ({ serverConsumerId }) => {
        console.log('consumer resume')
        const { consumer } = consumers.find(consumerData => consumerData.consumer.id === serverConsumerId)
        await consumer.resume()
    })

    socket.on('disconnect', () => {
        // do some cleanup
        console.log('peer disconnected')
        consumers = removeItems(consumers, socket.id, socket, 'consumer')
        producers = removeItems(producers, socket.id, socket, 'producer')
        transports = removeItems(transports, socket.id, socket, 'transport')

        if (peers[socket.id]) {
            const { roomName } = peers[socket.id]
            delete peers[socket.id]

            // remove socket from room
            rooms[roomName] = {
                router: rooms[roomName].router,
                peers: rooms[roomName].peers.filter(socketId => socketId !== socket.id),
                emails: rooms[roomName].emails.filter(email => email !== userInfos.email)
            }
        }
    })

})

const removeItems = (items, socketId, socket, type) => {
    items.forEach(item => {
        if (item.socketId === socket.id) {
            item[type].close()
        }
    })
    items = items.filter(item => item.socketId !== socket.id)
    console.log('removed an item')
    return items
}