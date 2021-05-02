const fs = require('fs').promises;
const { dataSource } = require('./../../../config');

const source = new Map();
fs.readFile(dataSource, 'utf8')
  .then(data => source.set('1', data))
  .catch();

const getById = async (id) => {
  const markupData = source.get(id);

  if (markupData === undefined) {
    throw new Error('Markup data not found');
  }

  return markupData;
}

module.exports = { getById }