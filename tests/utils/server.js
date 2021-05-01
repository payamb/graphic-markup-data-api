const { app, port } = require('../../src/app');

let server;
const baseUrl = `http://localhost:${port}`;

beforeEach((done) => {
    console.log(`[dev-server] binding to ${baseUrl}`);
    server = app.listen(port, done);
});

afterEach(() => {
    console.log('[dev-server] tearing down');
    server.close();
});

module.exports = baseUrl;