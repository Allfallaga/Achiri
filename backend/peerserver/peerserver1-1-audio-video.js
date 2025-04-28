const express = require('express')
const cors = require('cors')
const mediasoup = require('mediasoup')
const app = express()
const http = require('http');
const server = http.Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
})


app.use(cors())

server.listen(3002)

let worker
let router
let transportSend
let transportRecv
let audioConsumer
let videoConsumer
let audioProducer
let videoProducer

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
    router = await worker.createRouter({ mediaCodecs })
}

setupServer()

io.on('connection', async (socket) => {
    console.log('peer connected')
    console.log('------------',router.id)
    socket.on('router-rtp-capabilities', (callback) => {
        callback({ rtpCapabilities: router.rtpCapabilities })
    })

    socket.on('create-transports', async ({ sender }, callback) => {
        console.log(sender);
        if (sender) {
            transportSend = await router.createWebRtcTransport({
                listenIps: [{ ip: '127.0.0.1' }],
                enableUdp: true,
                enableTcp: true,
                preferUdp: true,
            })
            console.log(transportSend)
            callback({
                params: {
                    id: transportSend.id,
                    iceParameters: transportSend.iceParameters,
                    iceCandidates: transportSend.iceCandidates,
                    dtlsParameters: transportSend.dtlsParameters,
                }
            })
        } else {
            transportRecv = await router.createWebRtcTransport({
                listenIps: [{ ip: '127.0.0.1' }],
                enableUdp: true,
                enableTcp: true,
                preferUdp: true,
            })
            console.log(transportRecv)
            callback({
                params: {
                    id: transportRecv.id,
                    iceParameters: transportRecv.iceParameters,
                    iceCandidates: transportRecv.iceCandidates,
                    dtlsParameters: transportRecv.dtlsParameters,
                }
            })

        }
    })

    socket.on('transport-send-connect', async ({ transportId, dtlsParameters }) => {
        await transportSend.connect({ dtlsParameters })
    })
    socket.on('transport-recv-connect', async ({ transportId, dtlsParameters }) => {
        await transportRecv.connect({ dtlsParameters })
    })

    socket.on('transport-produce', async ({ transportId, kind, rtpParameters, appData }, callback) => {
        console.log(kind)
        let producer = await transportSend.produce({ kind, rtpParameters })
        kind == 'video' ? videoProducer = producer : audioProducer = producer
        callback({
            id: producer.id
        })
    })

    socket.on('create-consumer', async ({ deviceRtpCapabilities }, callback) => {
        if (router.canConsume({ producerId: videoProducer.id, rtpCapabilities: deviceRtpCapabilities })) {
            // Consume the producer by calling transport.consume({ producerId, rtpCapabilities }).
            videoConsumer = await transportRecv.consume({
                producerId: videoProducer.id,
                rtpCapabilities: deviceRtpCapabilities,
                paused: true
            })
            audioConsumer = await transportRecv.consume({
                producerId: audioProducer.id,
                rtpCapabilities: deviceRtpCapabilities,
                paused: true
            })
            let params = {
                video: {
                    id: videoConsumer.id,
                    producerId: videoProducer.id,
                    kind: videoConsumer.kind,
                    rtpParameters: videoConsumer.rtpParameters
                },
                audio: {
                    id: audioConsumer.id,
                    producerId: audioProducer.id,
                    kind: audioConsumer.kind,
                    rtpParameters: audioConsumer.rtpParameters
                }
            }
            console.log(params)
            callback({ params })
        }

    })

    socket.on('consumer-resume', async () => {
        await videoConsumer.resume()
        await audioConsumer.resume()
    })

    socket.on('stop-camera', () => {
        console.log('stopping camera')
        io.emit('stop-camera')
    })

    socket.on('stop-sound', () => {
        console.log('stopping sound')
        io.emit('stop-sound')
    })

    socket.on('disconnect', () => {
        console.log('peer disconnected')
    })

})