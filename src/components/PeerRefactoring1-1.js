import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client'
import { Device } from 'mediasoup-client'
import { create } from '@mui/material/styles/createTransitions';

function PeerRefactoring(props) {

    const routerRtpCapabilities = useRef()
    const socket = useRef()
    const device = useRef()
    const video_1 = useRef()
    const video_2 = useRef()
    const sendTransport = useRef()
    const recvTransport = useRef()
    const audioTrack = useRef()
    const videoTrack = useRef()
    const track = useRef()
    const videoProducer = useRef()
    const audioProducer = useRef()
    const videoConsumer = useRef()
    const audioConsumer = useRef()

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
    const audioParams = useRef({})
    const videoParams = useRef({
        encodings: [
            { rid: 'r0', scalabilityMode: 'L3T3_KEY' },
            { rid: 'r1', scalabilityMode: 'L3T3_KEY' },
            { rid: 'r2', scalabilityMode: 'L3T3_KEY' },
        ],
        codecOptions: {
            videoGoogleStartBitrate: 1000
        }
    })

    useEffect(() => {
        socket.current = io("185.245.96.81:445", { transports: ['websocket'] })
        socket.current.emit('router-rtp-capabilities', ({ rtpCapabilities }) => {
            console.log(rtpCapabilities)
            routerRtpCapabilities.current = rtpCapabilities
        })
        socket.current.on('stop-camera', () => {
            if (video_2.current.srcObject?.getVideoTracks()?.length > 0){
                video_2.current.srcObject = new MediaStream([audioConsumer.current.track])
            } else {
                video_2.current.srcObject = new MediaStream([audioConsumer.current.track, videoConsumer.current.track])
            }
        })
        socket.current.on('stop-sound', () => {
            video_2.current.srcObject = new MediaStream([videoConsumer.current.track])
        })
    }, [])

    const getMedia = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                videoTrack.current = stream.getVideoTracks()[0]
                audioTrack.current = stream.getAudioTracks()[0]
                track.current = stream.getTracks()[0]
                videoParams.current = {
                    ...videoParams.current,
                    track: videoTrack.current
                }
                audioParams.current = {
                    ...audioParams.current,
                    track: audioTrack.current
                }
                params.current = {
                    ...params.current,
                    track: track.current
                }
                video_1.current.srcObject = stream
            })
            .catch(error => {

            })
    }

    const loadDevice = async () => {
        device.current = new Device()
        await device.current.load({ routerRtpCapabilities: routerRtpCapabilities.current })
    }

    const createTransport = (sender) => {
        socket.current.emit('create-transports', { sender: sender }, async ({ params }) => {
            console.log(params)
            console.log(device.current)

            if (sender) {
                sendTransport.current = await device.current.createSendTransport(params)

                sendTransport.current.on('connect', async ({ dtlsParameters }, callback, errback) => {
                    try {
                        await socket.current.emit('transport-send-connect', { transportId: sendTransport.id, dtlsParameters: dtlsParameters })
                        callback()
                    } catch (error) {

                    }
                })
                sendTransport.current.on('produce', async (parameters, callback, errback) => {
                    try {
                        console.log('producing....')
                        await socket.current.emit('transport-produce', {
                            transportId: sendTransport.id,
                            kind: parameters.kind,
                            rtpParameters: parameters.rtpParameters,
                            appData: parameters.appData,
                        }, ({ id }) => {
                            console.log(id)
                            callback({ id })
                        })

                    } catch (error) {

                    }
                })
            } else {
                recvTransport.current = await device.current.createRecvTransport(params)

                recvTransport.current.on('connect', async ({ dtlsParameters }, callback, errback) => {
                    try {
                        await socket.current.emit('transport-recv-connect', { transportId: recvTransport.id, dtlsParameters: dtlsParameters })
                        callback()
                    } catch (error) {

                    }
                })
            }
        })
    }

    const createTransportSend = () => {
        createTransport(true)
    }
    const createTransportRecv = () => {
        createTransport(false)
    }

    const produce = async () => {
        [videoProducer.current, audioProducer.current] = await Promise.all(
            [
                sendTransport.current.produce(videoParams.current),
                sendTransport.current.produce(audioParams.current),
            ]
        )

    }

    const createConsumer = () => {
        console.log(device.current.rtpCapabilities)
        socket.current.emit('create-consumer', {
            deviceRtpCapabilities: device.current.rtpCapabilities
        }, async ({ params }) => {
            console.log(params)
            videoConsumer.current = await recvTransport.current.consume({
                id: params.video.id,
                producerId: params.video.producerId,
                kind: params.video.kind,
                rtpParameters: params.video.rtpParameters
            })
            audioConsumer.current = await recvTransport.current.consume({
                id: params.audio.id,
                producerId: params.audio.producerId,
                kind: params.audio.kind,
                rtpParameters: params.audio.rtpParameters
            })
            console.log(videoConsumer.current)
            console.log(audioConsumer.current)
            video_2.current.srcObject = new MediaStream([videoConsumer.current.track, audioConsumer.current.track])
            socket.current.emit('consumer-resume')
        })
    }

    const cameraOff = async () => {
        await socket.current.emit('stop-camera')
    }

    const soundOff = async () => {
        await socket.current.emit('stop-sound')
    }

    return (
        <div>
            <h1></h1>
            <div className='row'>
                <div className="col-md-6">
                    <video ref={video_1} autoPlay={true}></video>
                </div>
                <div className="col-md-6">
                    <video ref={video_2} autoPlay={true}></video>
                </div>
            </div>
            <div id="videoContainer" className='row'>
            </div>

            <button onClick={getMedia}>Get Media</button>
            <button onClick={loadDevice}>Load Device</button>
            <button onClick={createTransportSend}>Create Transport (SEND)</button>
            <button onClick={createTransportRecv}>Create Transport (RECV)</button>
            <button onClick={produce}>Produce</button>
            {/* <button onClick={produceAudio}>Produce</button> */}
            <button onClick={createConsumer}>Create Consumer</button>
            <button onClick={soundOff}>Mute</button>
            <button onClick={cameraOff}>Camera</button>
        </div>
    );
}

export default PeerRefactoring;