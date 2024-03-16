const Joi = require("joi");

module.exports = Joi.object({
  email: Joi.string()
    .pattern(/^[\w\-.]+@([\w-]+\.)+[\w-]+$/)
    .required(),
  username: Joi.string()
    .required(),
  password: Joi.string()
    .pattern(/.{8,16}/)
    .required(),
}).required();