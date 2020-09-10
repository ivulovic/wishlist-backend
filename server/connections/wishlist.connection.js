const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connectionString = process.env.NODE_ENV === "production" ? process.env.WISHLIST_CONNECTION_STRING : "mongodb://localhost:27017/wishlists";

module.exports = {
  connectionString,
}