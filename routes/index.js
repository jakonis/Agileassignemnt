// eslint-disable-next-line no-unused-vars

let express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Assignment" })
});

module.exports = router;
