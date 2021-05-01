const express = require('express');
const app = express();
const port = process.env.PORT || 8280;

app.get('/', (req, res) => {
  res.send('server is running')
})

module.exports = { app, port }