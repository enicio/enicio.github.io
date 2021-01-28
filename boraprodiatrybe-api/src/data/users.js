let users = [];

function saveUser({ userIP, authToken, googleToken }) {
    const user = {
        ip: userIP,
        token: authToken,
        googleToken,
    };
    users.push(user);
    return user;
}

function getUserByIP(ip) {
    return users.find(user => user.ip = ip);
}

function clearAllUsers() {
    users = [];
}

module.exports = {
    saveUser,
    clearAllUsers,
    getUserByIP,
};