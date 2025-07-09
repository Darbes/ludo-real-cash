const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

router.get("/game", async (req, res) => {
  const name = req.headers["player-name"];
  if (!name) return res.status(400).json({ status: "Missing player-name" });

  try {
    const games = await Game.find({ completed: true }).sort({ updatedAt: -1 });

    const history = games
      .filter(g => g.players.includes(name))
      .map(g => {
        const result = g.winner === name ? "Won" : "Lost";
        return {
          type: "game",
          amount: 10, // fixed amount
          result,
          date: g.updatedAt
        };
      });

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});
