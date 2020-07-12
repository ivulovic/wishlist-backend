const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { dbProd, dbDev } = require("./server/constants");
const app = express();
const port = process.env.PORT || 5001;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

mongoose.Promise = global.Promise;
mongoose
  .connect(app.get("env") === "development" ? dbDev : dbProd, { useNewUrlParser: true })
  .then(function (res) {
    console.log("Connected to Database Successfully.");
  })
  .catch(function () {
    console.log("Connection to database failed.");
  });
app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", " GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

const storeRoutes = require("./server/routes/store/store.routes");
const wishRoutes = require("./server/routes/wish/wish.routes");
const accountRoutes = require("./server/routes/account/account.routes");

// ROUTES
app.use("/api/account", accountRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/wishlists", wishRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;
