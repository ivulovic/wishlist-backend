const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const { AccountModel } = require("../../models");
const { secret } = require("../../constants");
const { NotFound } = require("../../helpers/response.helper");

module.exports = {
  register: async (req, res) => {
    const obj = new AccountModel(req.value.body);
    let user = await AccountModel.findOne({ email: obj.email });
    if (user) {
      return res.status(403).json({ status: 403, message: "User with such E-mail already exists." });
    }
    user = await AccountModel.findOne({ username: obj.username.toLowerCase() });
    if (user) {
      return res.status(403).json({ status: 403, message: "User with such Username already exists." });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(obj.password, salt, (err, hash) => {
        obj.password = hash;
        obj.role = "USER";
        obj.email = obj.email.toLowerCase();
        obj.username = obj.username.toLowerCase();
        obj.save();
        res.status(200).json(obj);
      });
    });
  },
  login: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.status(404).send(NotFound);
    }
    const field = req.body.email.includes("@") ? "email" : "username";

    let user = await AccountModel.findOne({ [field]: req.body.email.toLowerCase() }); //.populate("role");
    if (user) {
      bcrypt.compare(req.body.password, user.password, async (err, success) => {
        if (success) {
          const token = jwt.sign({ user: user._id }, secret, { expiresIn: "8h" });
          user.password = undefined;
          res.status(200).send({
            success: true,
            message: "Success.",
            token: token,
            email: user.email,
            username: user.username,
            isSuperUser: user.role === "ADMIN",
          });
        } else {
          res.status(404).send(NotFound);
        }
      });
    } else {
      res.status(404).send(NotFound);
    }
  },
  getInfo: async (req, res) => {
    const user = await AccountModel.findOne({ _id: req.decoded.user }, { password: 0 });
    if (user) {
      // const newToken = jwt.sign({ user: req.decoded.user }, secret, { expiresIn: "1h" });
      res.json({ username: user.username, email: user.email, isSuperUser: user.role === "ADMIN" }); // token: newToken
    }
  },
};
