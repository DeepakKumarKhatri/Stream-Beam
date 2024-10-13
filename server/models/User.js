const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    streamKey: { type: String, unique: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    fullname: { type: String },
    system: {
      isBlocked: {
        type: Boolean,
        default: false,
      },
      profileCompleted: {
        type: Boolean,
        default: false,
      },
      role: { type: String, required: true, enum: ["streamer", "user"] },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
