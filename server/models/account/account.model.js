const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { connectionString } = require("../../connections/account.connection");

const conn = mongoose.createConnection(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
conn.once("open", () => {
  console.log("Account, Connected to Database Successfully.")
})
// .then(function (res) {
//   console.log("Account, Connected to Database Successfully.");
//   return res;
// })
// .catch(function (e) {
//   console.log("Account, Connection to database failed.", e);
// });

const AccountSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  emailConfirmed: Boolean,
  password: String,
});

const modelName = 'account';
const collectionName = 'accounts';

mongoose.model(modelName, AccountSchema, collectionName);

const AccountModel = conn.model(modelName, collectionName);

module.exports = AccountModel;