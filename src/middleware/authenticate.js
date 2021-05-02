module.exports = (req, res, next) => {
  const validToken = 'ultra-secure-token';

  if (!req.header('x-auth') || req.header('x-auth') !== validToken) {
    return res
      .status(403)
      .json({ message: 'Authorization token is missing or is invalid', code: 403 });
  }

  next();
};