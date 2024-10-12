const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  chatMessages: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Stream", streamSchema);
