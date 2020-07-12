const { Schema, model } = require("mongoose");

const WishSchema = new Schema({
  url: String,
  // size: String,
  // color: String,
  title: String,
  image: String,
  oldPrice: String,
  currency: String,
  description: String,
  currentPrice: String,
  store: {
    type: Schema.Types.ObjectId,
    ref: "store",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
  modifiedBy: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
  createdAt: Number,
  modifiedAt: Number,
});

module.exports = model("wish", WishSchema);
