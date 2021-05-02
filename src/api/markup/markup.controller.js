const { getById } = require('./markup.model');

const parseSortQuery = sortBy => {
  const output = { 
    valid: false,
    field: {}
  };

  const allowedFields = ['in_frame', 'out_frame'];
  const allowedOrder = ['asc', 'desc'];

  const query = sortBy.split(':');

  if (
    allowedFields.includes(query[0]) && 
    allowedOrder.includes(query[1])
    ) {
    output.valid = true;
    output.field = { field: query[0], order: query[1] }
  }

  return output;
};

const parseQueryParams = params => {
  let output = {};

  if (params.sort) {
    const sortBy = parseSortQuery(params.sort);

    if (sortBy.valid === false) {
      throw new Error('Invalid sort value; sortby must be any of: in_frame, out_frame');
    }

    output.sort = sortBy.field;
  }

  if (params.filter) {
    filter = params.filter;
  }

  if (params.page && params.limit) {
    if (parseInt(params.page) <= 0 || parseInt(params.limit) <= 0) {
      throw new Error('Invalid pagination values; page and limit parameters need to be positive integers');
    }

    output.page = params.page;
    output.limit = params.limit;
  }

  return output;
};


module.exports = async (req, res) => {
  let markupData, query;

  try {
    query = parseQueryParams(req.query);
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message, code: 400 });
  }

  try {
    markupData = await getById(req.params.id);
  } catch (err) {
    return res
      .status(404)
      .json({ message: err.message, code: 404 });
  }

  console.log(query);

  res.json({ message: 'abcd', params: req.params, query: req.query });
}
