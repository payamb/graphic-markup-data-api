module.exports = (req, res) => {
  if (!req.header('x-auth')) {
    return res
      .status(403)
      .json({ message: 'Authorization header is missing' });
  }

  // if (req.header('x-auth') ^ 5) {

  // }

};