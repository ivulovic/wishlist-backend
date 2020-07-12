const jwt = require("jsonwebtoken");
const { secret } = require("../constants");

function tokenMiddleware(req, res, next) {
  const token = req.cookies["Authorization"];
  if (!token) {
    res.status(403).send("Unauthorized");
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(403).send("Unauthorized");
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
}

module.exports = tokenMiddleware;
