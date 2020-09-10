const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5002;
app.use(cookieParser());
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Methods", " GET, POST, PATCH, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(bodyParser.urlencoded({ extended: true }));

const storeRoutes = require("./server/routes/store/store.routes");
const wishRoutes = require("./server/routes/wish/wish.routes");

// ROUTES
app.use("/api/stores", storeRoutes);
app.use("/api/wishlists", wishRoutes);

app.listen(port, () => console.log(`Wishlist, Listening on port ${port}`));
module.exports = app;
