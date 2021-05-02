const request = require('supertest');
const { baseUrl } = require('./../config');

const validToken = 'ultra-secure-token';

describe('Test api endpoints', () => {
  it('should return 404 when requesting a non existstance resource', async () => {
    const expectedMessage = { message: 'Markup data not found', code: 404 };
    const res = await request(baseUrl)
      .get('/api/v1/markup/2')
      .set('x-auth', validToken);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(expectedMessage);
  });

  it('should return 400 when query params contain invalid value', async () => {
    const expectedMessage = { message: 'Markup data not found', code: 400 };
    const res = await request(baseUrl)
      .get('/api/v1/markup/1?sort=duration:asc')
      .set('x-auth', validToken);

    // expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual(expectedMessage);
  });
});