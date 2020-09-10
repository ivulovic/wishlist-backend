const mongoose = require('mongoose');
const { connectionString } = require("../../connections/wishlist.connection");
const conn = mongoose.createConnection(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  name: String,
  logo: String,
  origin: String,

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




const modelName = 'store';
const collectionName = 'stores';

mongoose.model(modelName, StoreSchema, collectionName);

const StoreModel = conn.model(modelName, collectionName);

module.exports = StoreModel;