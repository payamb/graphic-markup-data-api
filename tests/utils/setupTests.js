const app = require('../../src/app');
const { port } = require('../../config');

const setupServer = () => {
    let server;
    return {
        start: () => {
            server = app.listen(port);
        },
        stop: () => {
            server.close(() => {
                process.exit(0);
            });

            setTimeout(() => {
                process.exit(1);
            }, 2000);
        }
    }
}

module.exports = () => {
    global.httpServer = setupServer();
    global.httpServer.start();
};