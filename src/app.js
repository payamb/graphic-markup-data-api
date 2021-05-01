const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const router = express.Router();

const routerMiddleware = require('./middleware/invalidRouteHandler');

const port = process.env.PORT || 8280;

app.use(express.json());
app.use(router);
app.use(routerMiddleware);

module.exports = { app, port }