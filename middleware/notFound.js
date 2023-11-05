exports.notFound = (req, res, next) => {
  res.status(404).json({ message: "PATH NOT FOUND!" });
};
