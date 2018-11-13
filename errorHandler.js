const throwPageNotFoundError = (req, res, developer) => {
  const limitError = new Error('The requested page does not exist.');
  res.status(404);
  res.render('error', { developer, error: limitError });
}

module.exports.throwPageNotFoundError = throwPageNotFoundError;
