const socketio = require('socket.io');
const parseTechs = require('./utils/parseTechs');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);
    io.on('connection', socket => {
        // console.log(socket.id, socket.handshake.query);
        // setTimeout(() => {
        //     socket.emit('message', 'Hi there');
        // }, 3000);
        const { latitude, longitude, techs } = socket.handshake.query;
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseTechs(techs),
        });
    });
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(conn =>
        calculateDistance(coordinates, conn.coordinates) < 10
        && conn.techs.some(tech => techs.includes(tech))
    );
};

exports.sendMessage = (to, message, data) => {
    to.forEach(conn => {
        io.to(conn.id).emit(message, data);
    });
};
