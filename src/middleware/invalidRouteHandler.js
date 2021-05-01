module.exports = (req, res) => {
  res
    .status(404)
    .json({ error: 'Unable to find the requested resource' });
};