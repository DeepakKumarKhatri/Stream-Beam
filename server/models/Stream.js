const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  tags: { type: [String], default: [] },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  settings: {
    isPrivate: {
      type: Boolean,
      default: false,
    },
    ageRestrictions: {
      type: String,
    },
    streamQuality: {
      type: String,
    },
    bitRateKBPS: {
      type: String,
    },
    enableChat: {
      type: Boolean,
      default: true,
    },
    enableDonations: {
      type: Boolean,
      default: true,
    },
    subscribersOnly: {
      type: Boolean,
      default: true,
    },
  },
  stats: {
    peakViewers: {
      type: Number,
    },
    averageWatchTime: {
      type: String,
    },
    messagesCount: {
      type: Number,
    },
    donationsCount: {
      type: Number,
    },
  },
  chatMessages: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Stream", streamSchema);
