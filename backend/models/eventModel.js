const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Event Title"],
    trim: true,
  },
  Address: {
    type: String,
    required: [true, "Please Enter Event Address"],
  },
  Date: {
    type: String,
    required: [true, "Please Enter Event Date"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Event Description"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Event Category"],
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
