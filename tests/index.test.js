const request = require('supertest');
const baseUrl = require('./utils/server');

describe('Test api endpoints', () => {
  it('invalid routes should be handled correctly', async () => {
    const expectedMessage = { error: 'Unable to find the requested resource'};
    const res = await request(baseUrl).get('/');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(expectedMessage);
  });

  it('validate and authenticate bearer header token', async () => {
    const res = await request(baseUrl).get('/api/v1/markup');
    expect(res.statusCode).toEqual(403);
  });
});