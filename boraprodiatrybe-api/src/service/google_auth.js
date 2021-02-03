const { google } = require('googleapis');

const environments = require('../configs/environments');
const users = require('../data/users');

const oAuth2Client = new google.auth.OAuth2(
  environments.CLIENT_ID,
  environments.CLIENT_SECRET,
  environments.REDIRECT_URI
);

function getToken(code) {
  return oAuth2Client
    .getToken({ code })
    .catch((err) => console.log(`erro ao obeter token: ${err}`));
}

async function registerUser(code) {
  try {
    const tokenResponse = await getToken(code);
    const accessToken = tokenResponse.tokens.access_token;
    const userInfo = await oAuth2Client.getTokenInfo(accessToken);
    const savedUser = users.saveUser({
      userEmail: userInfo.email,
      googleCredentials: tokenResponse.tokens,
      authToken: Date.now().toString(),
    });
    return savedUser;
  } catch (err) {
    console.log(`Ouve erro no try: ${err}`);
  }
}

module.exports = {
  getToken,
  registerUser,
};
