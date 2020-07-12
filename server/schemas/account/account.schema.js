const Joi = require("joi");

module.exports = {
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  register: Joi.object().keys({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
