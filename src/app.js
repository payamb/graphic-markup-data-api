const express = require('express');
const app = express();
const router = express.Router();
const routerMiddleware = require('./middleware/missingResourceHandler');
const headerAuthentication = require('./middleware/authenticate');

app.use(express.json());
router.use('/api/', headerAuthentication);
router.get('/api/v1/markup/:id', require('./api/markup/markup.controller'));

app.use(router);
app.use(routerMiddleware);

module.exports = app;