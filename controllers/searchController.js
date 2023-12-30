async function search(req, res) {
  try {
    let searchTerm = req.body.searchTerm;
    console.log(searchTerm);
    res.status(200).json({
      message: "Success",
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
}

module.exports = {
  search,
};
