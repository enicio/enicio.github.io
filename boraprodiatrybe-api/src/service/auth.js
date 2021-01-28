const users = require('../data/users');

function createToken() {
    return String(Date.now());
}

function createUser(ip) {
    const token = createToken();
    const user = users.saveUser({ authToken: token, userIP: ip, googleToken: '123' });
    return user;
}

function isLogged(ip) {
    return Boolean(users.getUserByIP(ip));
}

module.exports = {
    createUser,
    isLogged,
}