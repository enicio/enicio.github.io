const express = require('express');
const environments = require('./configs/environments');
const users = require('./data/users');
const router = express.Router();

const socialLoginService = require('./service/google_auth');
const googleCalendarService = require('./service/calendar');

router.post('/events', (req, res) => {
  const accessToken = req.headers.authorization;
  if (!users.getUserByToken(accessToken)) {
    return res.status(403).json({ message: 'Você não está logado.' });
  }
  const events = req.body;
  googleCalendarService.addEventToGoogleCalendar(accessToken, events);
  return res.json({ message: 'eventos criados' });
});

router.post('/social-login', async (req, res) => {
  const { code } = req.body;
  console.log(req.body);
  const user = await socialLoginService.registerUser(code);
  return res.status(200).json({ ...user, credentials: undefined });
});

router.get('/client-id', (res) => {
  res.json({ client_id: environments.CLIENT_ID });
});

module.exports = router;
