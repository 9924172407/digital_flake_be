const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
