const mongoose = require("mongoose");

const WithdrawSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: Date
});

module.exports = mongoose.model("Withdraw", WithdrawSchema);
