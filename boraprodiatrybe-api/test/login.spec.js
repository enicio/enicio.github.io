const request = require('supertest');
const app = require('../src/api');
const users = require('../src/data/users');
/* Testes não estão funcionando */
describe('Authentication', () => {
  beforeEach(() => {
    users.clearAllUsers();
  });
  test('login router', async () => {
    const response = await request(app).post('/login').expect(200);
    expect(response.body).toHaveProperty('access_token');
  });
  it('Should not permit save events when user is not logged', async () => {
    await request(app).post('/events').expect(403);
  });
});
