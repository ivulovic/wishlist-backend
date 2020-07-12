const { Schema, model } = require("mongoose");

const StoreSchema = new Schema({
  name: String,
  logo: String,
  origin: String,

  // selectors
  // sizeSelector: String,
  // colorSelector: String,
  titleSelector: String,
  imageSelector: String,

  oldPriceSelector: String,
  currencySelector: String,
  currentPriceSelector: String,

  oldPriceParser: String,
  currencyParser: String,
  currentPriceParser: String,

  modifiedBy: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
  createdAt: Number,
  modifiedAt: Number,
});

module.exports = model("store", StoreSchema);
