const express = require('express');
const app = express();
const router = express.Router();
const routerMiddleware = require('./middleware/invalidRouteHandler');
const headerAuthenticationMiddleware = require('./middleware/headerAuthentication');

const port = process.env.PORT || 8280;

app.use(express.json());

router.use('/api/v1/', headerAuthenticationMiddleware);
router.use(routerMiddleware);

router.get('/api/v1/markup/', (req, res) => res.send('hello'));

app.use(router);

module.exports = { app, port }