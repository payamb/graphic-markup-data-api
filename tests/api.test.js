const request = require('supertest');
const { baseUrl } = require('./../config');

const validToken = 'ultra-secure-token';

describe('Test api endpoint /v1/markup/:id', () => {
  it('should return 404 when requesting a non existstance resource', async () => {
    const expectedMessage = { message: 'requested resource does not exists', code: 404 };
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

  it('should return correct result with GET request with no additional params', async () => {
    const expectedMessage = { message: 'Markup data not found', code: 200 };
    const response = await request(baseUrl)
      .get('/api/v1/markup/1')
      .set('x-auth', validToken);

    expect(response.statusCode).toEqual(200);
    expect(response.body.data.length).toEqual(500);
  });

  it('should filter result correctly based on location', async () => {
    const response = await request(baseUrl)
      .get('/api/v1/markup/1?location=Lower Left')
      .set('x-auth', validToken);

    expect(response.statusCode).toEqual(200);
    expect(response.body.data.length).toEqual(60);
  });

  it('should order result correctly based on sort query in desc order', async () => {
    const response = await request(baseUrl)
      .get('/api/v1/markup/1?location=Lower Left&sort=in_frame:desc')
      .set('x-auth', validToken);

    const isSorted = response.body.data.every((value, index, array) => {
      if (index === 0) return true;
      return array[index - 1].in_frame >= value.in_frame;
    });

    expect(response.statusCode).toEqual(200);
    expect(isSorted).toEqual(true);
  });

  it('should order result correctly based on sort query in asc order', async () => {
    const response = await request(baseUrl)
      .get('/api/v1/markup/1?location=Lower Left&sort=in_frame:asc')
      .set('x-auth', validToken);

    const isSorted = response.body.data.every((value, index, array) => {
      if (index === 0) return true;
      return array[index - 1].in_frame <= value.in_frame;
    });

    expect(response.statusCode).toEqual(200);
    expect(isSorted).toEqual(true);
  });

  it('should paginate results when page and limit query params are provided', async () => {
    const response = await request(baseUrl)
      .get('/api/v1/markup/1?location=Lower Left&limit=10&page=1')
      .set('x-auth', validToken);

    expect(response.statusCode).toEqual(200);
    expect(response.body.count).toEqual(10);
  });

});