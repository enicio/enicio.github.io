const { google, calendar_v3 } = require('googleapis');
const dateFns = require('date-fns');

const environments = require('../configs/environments');
const users = require('../data/users');

const oAuth2Client = new google.auth.OAuth2(
  environments.CLIENT_ID,
  environments.CLIENT_SECRET,
  environments.REDIRECT_URI
);

function addEventToGoogleCalendar(accessToken, events) {
  const user = users.getUserByToken(accessToken);
  oAuth2Client.setCredentials(user.credentials);
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  const todayString = dateFns.format(new Date(), 'yyyy-MM-dd');
  events.forEach((event) => {
    /**
     * @type {calendar_v3.Schema$Event}
     */
    const eventData = {
      start: {
        dateTime: `${todayString}T${event.startHour}:00`,
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: `${todayString}T${event.endHour}:59`,
        timeZone: 'America/Sao_Paulo',
      },
      summary: event.title,
      reminders: {
        overrides: [{ minutes: 5, method: 'popup' }],
        useDefault: false,
      },
    };
    calendar.events.insert({ calendarId: 'primary', requestBody: eventData });
  });
}

module.exports = {
  addEventToGoogleCalendar,
};
