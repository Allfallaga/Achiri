rooms = {
    roomName1: {
        router: router1,
        peers: [socketId1, socketId2, socketId3 ...]
    }
     roomName2: {
        router: router2,
        peers: [socketId1, socketId2, socketId3 ...]
    }
}
peers = {
    socketId1: {
        socket1,
        roomName1,
        transports: [id1, id2 ...],
        producers: [id1, id2 ...],
        consumers: [id1, id2 ...],
        peerDetails1
    },
    socketId2: {
        socket1,
        roomName1,
        transports: [id1, id2 ...],
        producers: [id1, id2 ...],
        consumers: [id1, id2 ...],
        peerDetails1
    },
}


// When I join

rooms = {
    'room1': {
        router: router1,
        peers: ['mohand', 'nabile']
    }
    'room2': {
        router: router1,
        peers: ['mohand', 'nabile']
    }
}

peers = {
    'mohand-socket-id': {
        mySocket,
        'room1',
        transports: [sendtransportMohand.id],
        producers: [],
        consumers: [],
    },
    'nabile-socket-id': {
        mySocket,
        'room1',
        transports: [sendtransportNabile.id],
        producers: [],
        consumers: [],
    }
    'Jamal-socket-id': {
        mySocket,
        'room2',
        transports: [sendtransport.id],
        producers: [],
        consumers: [],
    }
}

// When I Start Producing

transports = [..., { socketId: 'mySocket', transport: sendTransportMohand, roomName: 'room1', consumer: false }]

producers = [..., { socketId: 'mySocket', producers: { video: videoProd, audio: audioProd }, roomName }]

peers = {
    'mohand-socket-id': {
        mySocket,
        'room1',
        transports: [sendtransportMohand.id],
        producers: [myProducer],
        consumers: [],
    },
    ...}