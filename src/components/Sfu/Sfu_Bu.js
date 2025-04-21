import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client'
import { Device } from 'mediasoup-client'
import MediaRcv from '../MediaRcv/MediaRcv';
import { IoVolumeMuteSharp, IoVideocamOffSharp, IoBanSharp } from 'react-icons/io5'
// import Slider from 'react-slick'

function Sfu(props) {

    const alreadyConnected = useRef(false)
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    const rtpCapabilities = useRef()
    const socket = useRef()
    const device = useRef()
    const admin_media = useRef()
    const my_media = useRef()
    const producerTransport = useRef()
    const consumerTransports = useRef([])
    const track = useRef()
    const [receivedTracks, setReceiveTracks] = useState([])
    const isAdmin = useRef()
    const producer = useRef()
    const roomName = useRef(props.roomName)
    const videoContainer = useRef()
    const params = useRef({
        encodings: [
            { rid: 'r0', scalabilityMode: 'L3T3_KEY' },
            { rid: 'r1', scalabilityMode: 'L3T3_KEY' },
            { rid: 'r2', scalabilityMode: 'L3T3_KEY' },
        ],
        codecOptions: {
            videoGoogleStartBitrate: 1000
        }
    })

    useEffect(async () => {
        isAdmin.current = props.isAdmin
        videoContainer.current = document.getElementById('videoContainer')
        socket.current = io("185.245.96.81:445", { transports: ['websocket'] })
        socket.current.on('connection-success', ({ socketId }) => {
            startStreaming(props.isAdmin)
        })
        socket.current.on('new-producer', ({ producerId }) => signalNewConsumerTransport(producerId))
        socket.current.on('producer-closed', ({ remoteProducerId }) => {

            // server notification is received when a producer is closed
            // we need to close the client-side consumer and associated transport
            const producerToClose = consumerTransports.current.find(transportData => transportData.producerId === remoteProducerId)
            producerToClose.consumerTransport.close()
            producerToClose.consumer.close()

            // remove the consumer transport from the list
            consumerTransports.current = consumerTransports.current.filter(transportData => transportData.producerId !== remoteProducerId)

        })
        socket.current.on('duplicate-user', ({ exists }) => {
            alreadyConnected.current = exists
        })
    }, [])

    const startStreaming = async (isAdmin) => {
        await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(stream => {
                track.current = stream.getTracks()[0]
                params.current = {
                    ...params.current,
                    track: track.current
                }
                // if (isAdmin.current) {
                //     admin_media.current.srcObject = stream
                // } else {
                //     my_media.current.srcObject = stream
                // }
                console.log('--------------', isAdmin)
                isAdmin ? admin_media.current.srcObject = stream : my_media.current.srcObject = stream
                joinRoom()
            })
            .catch(error => {
                console.log(error)
                alert(error.message)
            })
    }

    const joinRoom = () => {
        socket.current.emit('joinRoom', { roomName: roomName.current, user: props.user, isAdmin: props.isAdmin }, (data) => {
            console.log('Router RTP : ', data.rtpCapabilities)
            rtpCapabilities.current = data.rtpCapabilities
            createDevice()
        })
    }

    const createDevice = async () => {
        try {
            device.current = new Device()
            await device.current.load({ routerRtpCapabilities: rtpCapabilities.current })

            createProducerTransport()
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    const createProducerTransport = () => {
        socket.current.emit('createWebRtcTransport', { consumer: false }, ({ params }) => {
            if (params.error) {
                console.log(params.error)
                return
            }

            // creates a new WebRTC Transport to send media
            // based on the server's producer transport params
            producerTransport.current = device.current.createSendTransport(params)

            producerTransport.current.on('connect', async ({ dtlsParameters }, callback, errback) => {
                try {
                    // Signal local DTLS parameters to the server side transport
                    // see server's socket.on('transport-connect', ...)
                    await socket.current.emit('transport-connect', {
                        dtlsParameters,
                    })

                    // Tell the transport that parameters were transmitted.
                    callback()

                } catch (error) {
                    errback(error)
                }
            })
            producerTransport.current.on('produce', async (parameters, callback, errback) => {
                try {
                    // if (!alreadyConnected.current) {
                    if (true) {
                        await socket.current.emit('transport-produce', {
                            kind: parameters.kind,
                            rtpParameters: parameters.rtpParameters,
                            appData: parameters.appData,
                        },
                            ({ id, producersExist }) => {
                                callback({ id })
                                // if there is any producer server side we launch the process of consuming
                                if (producersExist) getProducers()
                            })
                    } else {
                        await socket.current.emit('consumer-no-produce', { userEmail: props.user.email }, ({ producersExist }) => {
                            if (producersExist) getProducers()
                        })
                    }

                } catch (error) {
                    console.log(error)
                    alert(error?.message)
                }
            })

            connectSendTransport()
        })
    }

    const connectSendTransport = async () => {
        // we now call produce() to instruct the producer transport
        // to send media to the Router
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
        // this action will trigger the 'connect' and 'produce' events above
        producer.current = await producerTransport.current.produce(params.current)

        producer.current.on('trackended', () => {
            console.log('track ended')

            // close video track
        })

        producer.current.on('transportclose', () => {
            console.log('transport ended')

            // close video track
        })
    }

    const getProducers = () => {
        socket.current.emit('getProducers', producerIds => {
            console.log(producerIds)
            // for each of the producer create a consumer
            // producerIds.forEach(id => signalNewConsumerTransport(id))
            producerIds.forEach(producerId => {
                signalNewConsumerTransport(producerId)
            })
        })
    }

    const signalNewConsumerTransport = async (remoteProducerId) => {
        // This function is called in a loop in the server
        // And loops through all the producers to consume the remote producer id
        console.log('new producer --------------')
        await socket.current.emit('createWebRtcTransport', { consumer: true }, ({ params }) => {
            if (params.error) {
                console.log(params.error)
                return
            }
            let consumerTransport
            try {
                consumerTransport = device.current.createRecvTransport(params)
                console.log('consumer transport : ', consumerTransport);
            } catch (error) {
                console.log(error)
                alert(error.message)
                return
            }

            consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
                try {
                    await socket.current.emit('transport-recv-connect', {
                        dtlsParameters: dtlsParameters,
                        serverConsumerTransportId: params.id
                    })
                    callback()
                } catch (error) {
                    errback(error)
                }
            })
            connectRecvTransport(consumerTransport, remoteProducerId, params.id)

        })
    }

    const connectRecvTransport = async (consumerTransport, remoteProducerId, serverConsumerTransportId) => {
        // for consumer, we need to tell the server first
        // to create a consumer based on the rtpCapabilities and consume
        // if the router can consume, it will send back a set of params as below
        console.log('consuming connectRcvTrans')
        console.log(device.current.rtpCapabilities)
        console.log(remoteProducerId)
        console.log(serverConsumerTransportId)
        await socket.current.emit('consume', {
            rtpCapabilities: device.current.rtpCapabilities,
            remoteProducerId,
            serverConsumerTransportId,
        }, async ({ params, socketId, isAdmin }) => {
            if (params.error) {
                console.log('Cannot Consume')
                console.log(params.error)
                return
            }

            console.log('Producer is admin ? : ', isAdmin)
            // then consume with the local consumer transport
            // which creates a consumer
            const consumer = await consumerTransport.consume({
                id: params.id,
                producerId: params.producerId,
                kind: params.kind,
                rtpParameters: params.rtpParameters
            })

            consumerTransports.current = [
                ...consumerTransports.current,
                {
                    consumerTransport,
                    serverConsumerTransportId: params.id,
                    producerId: remoteProducerId,
                    consumer,
                },
            ]

            // store the consumers in a list which controls the display of them
            if (!isAdmin)
                setReceiveTracks(v => [...v, { socketId: socketId, videoConsumer: consumer, audioConsumer: {} }])

            if (isAdmin) {
                admin_media.current.srcObject = new MediaStream([consumer.track])
            }

            // so we need to inform the server to resume
            socket.current.emit('consumer-resume', { serverConsumerId: params.serverConsumerId })
        })
    }

    const switchTo = (e) => {
        console.log(e.target);
    }

    return (
        <div className='media-area'>
            <div className='main-media'>
                <video ref={admin_media} autoPlay={true}></video>
                <div className='my-media'>
                    <video ref={my_media} autoPlay={true}></video>
                    {!props.isAdmin && <div onClick={switchTo} className="moderation-controls-container">
                        <div className="moderation-controls">
                            <span className="moderation-icon-control icon-mute">
                                <IoVolumeMuteSharp />
                            </span>
                            <span className="moderation-icon-control icon-video">
                                <IoVideocamOffSharp />
                            </span>
                        </div>
                    </div>}
                </div>
            </div>
            <div {...settings} className='secondary-media'>
                {receivedTracks.map((consumer) => {
                    return (
                        <div key={consumer.socketId} className='their-media'>
                            <div className="moderation-controls-container">
                                <div className="moderation-controls">
                                    <span className="moderation-icon-control icon-mute">
                                        <IoVolumeMuteSharp />
                                    </span>
                                    <span className="moderation-icon-control icon-video">
                                        <IoVideocamOffSharp />
                                    </span>
                                </div>
                            </div>
                            <MediaRcv socketId={consumer.socketId} consumer={consumer}></MediaRcv>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Sfu;