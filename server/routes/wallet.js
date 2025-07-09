// POST /api/wallet/withdraw
router.post("/withdraw", async (req, res) => {
  const name = req.headers["player-name"];
  const amount = parseInt(req.body.amount);

  if (!name || !amount || amount < 1) {
    return res.status(400).json({ status: "Invalid input" });
  }

  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(404).json({ status: "User not found" });

    if (user.wallet < amount) {
      return res.json({ status: "Insufficient balance" });
    }

    user.wallet -= amount;
    await user.save();

    // Save to WithdrawHistory collection (optional)
    const Withdraw = require("../models/Withdraw");
    await Withdraw.create({ name, amount, date: new Date() });

    res.json({ status: `Withdrawn ₹${amount}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Error during withdraw" });
  }
});

const express = require("express");
const router = express.Router();

router.get("/add", (req, res) => {
  res.json({ balance: 100 });
});

module.exports = router;
