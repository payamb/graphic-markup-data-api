const port = process.env.PORT || 8280;
const baseUrl = `http://localhost:${port}`;

const dataSource = './data/graphic-markup-data.json';

module.exports = { port, baseUrl, dataSource }