app.use("/api/history", require("./routes/history"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "player-name, Content-Type");
  next();
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const gameRoutes = require("./routes/game");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/game", gameRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(3000, () => console.log("Server started on port 3000"));
}).catch(err => console.error(err));
