const Joi = require("joi");

module.exports = {
  create: Joi.object().keys({
    name: Joi.string().required(),
    logo: Joi.string().required(),
    origin: Joi.string().required(),
    titleSelector: Joi.string().required(),
    imageSelector: Joi.string().required(),
    oldPriceSelector: Joi.string().required(),
    currencySelector: Joi.string().required(),
    currentPriceSelector: Joi.string().required(),
    oldPriceParser: Joi.string().required(),
    currencyParser: Joi.string().required(),
    currentPriceParser: Joi.string().required(),
  }),
  update: Joi.object().keys({
    name: Joi.string().required(),
    logo: Joi.string().required(),
    origin: Joi.string().required(),
    titleSelector: Joi.string().required(),
    imageSelector: Joi.string().required(),
    oldPriceSelector: Joi.string().required(),
    currencySelector: Joi.string().required(),
    currentPriceSelector: Joi.string().required(),
    oldPriceParser: Joi.string().required(),
    currencyParser: Joi.string().required(),
    currentPriceParser: Joi.string().required(),
  }),
};
