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

  it('should return 400 when query params contain any invalid value', async () => {
    const queries = [
      'sort=duration:asc', 
      'sort=out_frame:ascending',
      'sort=duration:asc&location=Lower',
      // 'page=1',
      'page=-1&limit=50'
    ];

    const requests = queries.map(query => {
      return request(baseUrl)
        .get(`/api/v1/markup/1?${query}`)
        .set('x-auth', validToken);
    });

    await Promise.all(requests);

    requests.forEach(request => {
      expect(request.response.statusCode).toEqual(400);
    });
  });
});