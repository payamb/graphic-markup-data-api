const { getById } = require('./markup.model');

const parseSortQuery = sortBy => {
  const output = { 
    valid: false,
    sortBy: {}
  };

  const allowedFields = ['in_frame', 'out_frame'];
  const allowedOrder = ['asc', 'desc'];

  const query = sortBy.split(':');

  if (
    allowedFields.includes(query[0]) && 
    allowedOrder.includes(query[1])
    ) {
    output.valid = true;
    output.sortBy = { field: query[0], order: query[1] }
  }

  return output;
};

const parseQueryParams = params => {
  // Sorting (by in_frame, out_frame, and in ascending and descending order)
  // Filtering (by content.location)
  // Pagination by accepting optional page number and page size inputs

  // ?sortby=in_frame:asc
  // ?filter=content.location
  // ?page=1&limit=100

  if (params.sort) {
    const sortBy = parseSortQuery(params.sort);
    if (sortBy.valid === false) {
      throw new Error('Invalid sort value, sortby must be any of: in_frame, out_frame');
    }
  }
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

  res.json({ message: 'abcd', params: req.params, query: req.query });
}
