const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { app } = require("../../config");

const UserSchema = new mongoose.Schema(
  {
    refId: {
      type: Number,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String
    },
    photo: {
      type: String
    },
    location: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates: {
        type: [Number],
        index: "2dsphere"
      }
    }
  },
  {
    timestamps: true
  }
);

UserSchema.statics = {
  generateToken({ refId, username }) {
    return jwt.sign({ refId, username }, app.secret, { expiresIn: 86400 });
  }
};

mongoose.model("User", UserSchema);
