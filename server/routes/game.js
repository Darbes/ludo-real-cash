const GameSchema = new mongoose.Schema({
  players: [String],
  completed: Boolean,
  winner: String
}, { timestamps: true }); // <-- add this

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Game = require("../models/Game");

// POST /api/game/start
router.post("/start", async (req, res) => {
  const name = req.headers["player-name"];

  if (!name) return res.status(400).json({ status: "Missing player name" });

  try {
    let user = await User.findOne({ name });
    if (!user) {
      // If new player, create with ₹100
      user = await User.create({ name, wallet: 100 });
    }

    // Check balance
    if (user.wallet < 10) {
      return res.json({ status: "Insufficient balance" });
    }

    // Deduct ₹10
    user.wallet -= 10;
    await user.save();

    // Find or create a pending game
    let game = await Game.findOne({ completed: false });

    if (!game) {
      // First player joining
      game = await Game.create({
        players: [name],
        completed: false
      });
      return res.json({ status: "Waiting for opponent..." });
    } else {
      // Second player joining
      game.players.push(name);
      game.completed = true;

      // Pick winner randomly
      const winner = game.players[Math.floor(Math.random() * 2)];

      // Pay winner ₹20
      const winUser = await User.findOne({ name: winner });
      winUser.wallet += 20;
      await winUser.save();

      await game.save();

      return res.json({ status: `Game completed. Winner: ${winner}` });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "Server error" });
  }
});

module.exports = router;
