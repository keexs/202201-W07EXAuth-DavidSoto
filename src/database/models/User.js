const { model, Schema } = require("mongoose");

const UserModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("user", UserModel, "users");

module.exports = User;
