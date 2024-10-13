const mongoose = require("mongoose");

const systemPreferenceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    streamQuality: {
      type: String,
    },
    bitRateKBPS: {
      type: String,
    },
    twoFactorEnable: {
      type: Boolean,
      default: false,
    },
    notifications: {
      emailNotifications: {
        type: Boolean,
        default: false,
      },
      pushNotifications: {
        type: Boolean,
        default: false,
      },
      smsNotifications: {
        type: Boolean,
        default: false,
      },
    },
    appearance: {
      theme: {
        type: String,
        default: "light",
      },
      language: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SystemPreference", systemPreferenceSchema);
