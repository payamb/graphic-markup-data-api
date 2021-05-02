const request = require('supertest');
const { baseUrl } = require('./../config');

describe('Test api server', () => {

  it('should handle invalid routes correctly', async () => {
    const expectedMessage = { message: 'Unable to find the requested resource', code: 404 };
    const routes = ['/', '/home/', '/v1/'];

    const requests = routes.map(route => request(baseUrl).get(route));

    await Promise.all(requests);

    requests.forEach((request) => {
      expect(request.response.statusCode).toEqual(404);
      expect(request.response.body).toEqual(expectedMessage);
    })
  });

  it('should deny access if the authorization header is not set or is invalid', async () => {
    const expectedMessage = { message: 'Authorization token is missing or is invalid', code: 403 };
    const authTokens = [null, '', ' ', 123, 'abc'];

    const requests = authTokens.map(token => {
      return request(baseUrl)
        .get('/api/v1/markup/1')
        .set('x-auth', token)
    });

    await Promise.all(requests);

    requests.forEach((request) => {
      expect(request.response.statusCode).toEqual(403);
      expect(request.response.body).toEqual(expectedMessage);
    })
  });

  it('should validate and authorise requests with correct x-auth token', async () => {
    const res = await request(baseUrl)
      .get('/api/v1/markup/1')
      .set('x-auth', 'ultra-secure-token');

    expect(res.statusCode).toEqual(200);
  });
});