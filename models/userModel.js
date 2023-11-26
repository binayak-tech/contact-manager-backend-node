const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a user name"],
    },
    email: {
      type: String,
      required: [true, "Please Provide the email address"],
      unique: [true, "Email address already taken!"],
    },
    password: { type: String, required: [true, "Please Provide a Password"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
