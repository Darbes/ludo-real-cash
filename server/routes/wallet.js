const express = require("express");
const router = express.Router();

router.get("/add", (req, res) => {
  res.json({ balance: 100 });
});

module.exports = router;