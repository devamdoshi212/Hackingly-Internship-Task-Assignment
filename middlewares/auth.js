module.exports = function (req, res, next) {
  try {
    console.log("Hello From Middleware");
    if (req.body.auth === 0) {
      next();
    } else {
      res.status(400).json({
        message: "Not authenticated",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
