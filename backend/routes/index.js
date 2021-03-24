var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello World");
});

router.get("/data", function (req, res) {
  res.send({ name: "We're connected...", email: "to the backend!!!" });
});

module.exports = router;
