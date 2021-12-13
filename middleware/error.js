module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: err.details[0].message,
      },
    });
  }

  const statusByErrorCode = {
    invalidData: 422,
    notFound: 400,
  };
  console.log(err);
  const status = err.code || statusByErrorCode.notFound;

  res.status(status).json({ message: err.message });
};
