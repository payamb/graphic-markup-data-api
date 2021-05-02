const app = require('./src/app');
const { port } = require('./config');

app.listen(port, () => {
  console.log('Server is running on port : ' + port);
});