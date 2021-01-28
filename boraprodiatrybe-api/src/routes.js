const express = require('express');
const auth = require('./service/auth');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.post('/login', (req, res) => {
    const ip = req.connection.remoteAddress;
    const { token } = auth.createUser(ip);
    res.status(200).json({access_token: token});
});

router.post('/events', (req, res) => {
    const ip = req.connection.remoteAddress;
    if (!auth.isLogged(ip)) {
        return res.status(403).json({message: 'Você não está logado.'});
    }
    console.log('está logado');
});

module.exports = router;