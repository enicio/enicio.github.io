const fs = require('fs/promises');
const path = require('path');

const DATABASE_NAME = 'database.json';
const DATABASE_PATH = path.join(__dirname, '..', '..', DATABASE_NAME);
let users = {};

async function loadData() {
  try {
    const file = await fs.readFile(DATABASE_PATH);
    const jsonData = JSON.parse(file);
    users = jsonData;
  } catch (err) {
    console.log('Houve algum erro ao carregar o banco');
    console.log(err);
    process.exit(123);
  }
}

async function saveData() {
  try {
    const json = JSON.stringify(users);
    await fs.writeFile(DATABASE_PATH, json);
  } catch (err) {
    console.log('Ops, deu erro ao savar o database.json');
    console.log(err);
  }
}

function saveUser({ userEmail, authToken, googleCredentials }) {
  const user = {
    email: userEmail,
    token: authToken,
    credentials: googleCredentials,
  };
  users[userEmail] = user;
  saveData();
  return user;
}

function getUserByEmail(email) {
  return users[email];
}

function getUserByToken(accessToken) {
  return Object.values(users).find((user) => user.token === accessToken);
}

function clearAllUsers() {
  users = {};
}

module.exports = {
  saveUser,
  clearAllUsers,
  getUserByEmail,
  getUserByToken,
  loadData,
};
