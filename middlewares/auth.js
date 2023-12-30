module.exports = function (req, res, next) {
  try {
    console.log("Hello From Middleware");
    if (req.body.auth === 0) {
      next();
    } else {
      res.status(400).json({
        message: "not authenticated ",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err,
    });
  }
};
