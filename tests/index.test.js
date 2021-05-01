const request = require('supertest');
const baseUrl = require('./utils/server');

describe('Test api endpoints', () => {
  it('invalid routes should return an error', async () => {
    const res = await request(baseUrl).get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('invalid route');
  });
});