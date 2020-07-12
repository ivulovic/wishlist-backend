const { Schema, model } = require("mongoose");

const AccountSchema = new Schema({
  email: String,
  password: String,
  username: String,
  role: String,
});

module.exports = model("account", AccountSchema);
