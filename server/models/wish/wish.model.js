const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { connectionString } = require("../../connections/wishlist.connection");
const conn = mongoose.createConnection(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

conn.once("open", () => {
  console.log("Wishlist, Connected to Database Successfully.")
});

const WishSchema = new Schema({
  url: String,
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


const modelName = 'wish';
const collectionName = 'wishes';

mongoose.model(modelName, WishSchema, collectionName);

const WishModel = conn.model(modelName, collectionName);

module.exports = WishModel;