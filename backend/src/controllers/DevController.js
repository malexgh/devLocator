const axios = require('axios');
const Dev = require('../models/Dev');
const parseTechs = require('../utils/parseTechs');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();
        res.json(devs);
    },
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;
        let dev = await Dev.findOne({ github_username });
        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = response.data;
            const techsArray = parseTechs(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
            dev = await Dev.create({ github_username, name, bio, avatar_url, techs: techsArray, location });
            //send dev to socket.io
            const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray);
            //console.log(sendSocketMessageTo);
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
        res.json(dev);
    },
    async update(req, res) {
    },
    async destroy(req, res) {
    },
};
