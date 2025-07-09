const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  players: [String],
  winner: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Game", gameSchema);