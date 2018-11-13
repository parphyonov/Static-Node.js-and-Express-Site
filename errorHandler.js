const throwPageNotFoundError = (req, res) => {
  const limitError = new Error('The requested page does not exist.');
  limitError.code = 404;
  res.status(404);
  return limitError;
}

module.exports.throwPageNotFoundError = throwPageNotFoundError;
