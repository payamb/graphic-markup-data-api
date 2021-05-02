const fs = require('fs').promises;
const { dataSource } = require('./../../../config');

const pipe = (...fns) => (arg) => fns.reduce((prev, fn) => fn(prev), arg);

const pipeWith = (arg, ...fns) => pipe(...fns)(arg);

const getDataSource = async () => {
  const source = new Map();
  const data = await fs.readFile(dataSource, 'utf8');
  source.set(1, JSON.parse(data));

  return source;
}

const filterByLocation = (params) => {
  if (!params.options.location) return params;

  const markupData = params
    .markupData
    .filter(r => {
      return (r.content && r.content.location)
        ? r.content.location.includes(params.options.location)
        : false;
    });

  return { markupData, options: params.options };
};

const sortBy = (params) => {
  if (!params.options.sort) return params;

  const markupData = params.markupData;
  const sortBy = params.options.sort;

  markupData.sort((a, b) => {
    const order = (sortBy.order === 'asc')
      ? (a[sortBy.field] > b[sortBy.field]) ? 1 : -1
      : (a[sortBy.field] < b[sortBy.field]) ? 1 : -1;

    return order;
  });

  return { markupData, options: params.options }
}

const paginate = (params) => {
  if (!params.options.page || !params.options.limit) return params;

  const page = parseInt(params.options.page);
  const limit = parseInt(params.options.limit);

  const start = (page - 1) * (limit) + 1;
  const end = start + limit;

  const paginatedResult = params.markupData.slice(start, end);

  return { markupData: paginatedResult, options: params.options };
}

const getById = async (id, options) => {
  const source = await getDataSource();

  if (source.has(id) === false) {
    throw new Error('requested resource does not exists');
  }

  const query = { options, markupData: source.get(id) };
  const result = pipeWith(query, filterByLocation, sortBy, paginate);

  return result.markupData;
}

module.exports = { getById }