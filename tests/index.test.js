const request = require('supertest');
const baseUrl = require('./utils/server');

describe('Test api endpoints', () => {
  it('get request to / should return valid response', async () => {
    const res = await request(baseUrl).get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('server is running');
  });
});