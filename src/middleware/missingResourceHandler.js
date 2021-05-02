module.exports = (req, res, next) => {
  res
    .status(404)
    .json({ message: 'Unable to find the requested resource', code: 404});
};