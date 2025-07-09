const express = require("express");
const router = express.Router();

router.post("/start", (req, res) => {
  res.json({ status: "Game started" });
});

module.exports = router;