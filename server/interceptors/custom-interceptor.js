exports.checkBody = (req, res, next) => {
  console.log("Body - ", req.body);
  if (!req.body) {
    return res.status(400).send({
      status: "fail",
      message: "Specific Data is missing",
    });
  }
  next();
};
