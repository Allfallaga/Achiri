const mediasoup = require('mediasoup')

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

exports.setupServer = async () => {
    let worker = await mediasoup.createWorker()
    worker.on('died', error => {
        // This implies something serious happened, so kill the application
        console.error('mediasoup worker has died')
        setTimeout(() => process.exit(1), 2000) // exit in 2 seconds
    })

    return worker
}

exports.createRoom = async (worker, rooms, roomName, socketId) => {

    console.log(worker)
    let routerTmp
    let peers = []
    if (rooms[roomName]) {
        routerTmp = rooms[roomName].router
        peers = rooms[roomName].peers || []
    } else {
        routerTmp = await worker.createRouter({ mediaCodecs })
    }

    // console.log('created a router ', routerTmp.id + ' peers : ' + peers.length)
    rooms[roomName] = {
        router: routerTmp,
        peers: [...peers, socketId]
    }

    return routerTmp
}

exports.createTransports = async (router) => {
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

exports.addTransport = (transport, roomName, consumer, socketId) => {
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

exports.getTransport = (socketId) => {
    //Finds the send transport of a user determined by its socket
    const [producerTransport] = transports.filter(transport => transport.socketId === socketId && !transport.consumer)
    return producerTransport.transport
}

exports.addProducer = (producer, roomName, socketId) => {
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

exports.informConsumers = (roomName, socketId, id) => {
    // Inform all consumers to consume this producer
    // Loop through all producers and signal to create a new consumer in client side
    producers.forEach(producer => {
        if (producer.socketId !== socketId && producer.roomName == roomName) {
            const producerSocket = peers[producer.socketId].socket
            console.log("new producer ", id)
            // Emit to all the users except for the actual producer that he Joined
            producerSocket.emit('new-producer', { producerId: id })
        }
    })
}

exports.addConsumer = (consumer, roomName, socketId) => {
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