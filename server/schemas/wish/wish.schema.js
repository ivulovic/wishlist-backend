const Joi = require("joi");

module.exports = {
  urlIdentificator: Joi.object().keys({
    id: Joi.string().required(),
  }),
  create: Joi.object().keys({
    origin: Joi.string().required(),
    url: Joi.string().required(),
    title: Joi.string().required(),
    image: Joi.string().required(),
    currency: Joi.string().required(),
    currentPrice: Joi.string().required(),
    oldPrice: Joi.string().allow(""),
    description: Joi.string().allow(""),
  }),
  fetch: Joi.object().keys({
    url: Joi.string().uri().required(),
  }),
  update: Joi.object().keys({
    url: Joi.string().required(),
    title: Joi.string().required(),
    image: Joi.string().required(),
    currency: Joi.string().required(),
    currentPrice: Joi.string().required(),
    oldPrice: Joi.string().default(""),
  }),
};
