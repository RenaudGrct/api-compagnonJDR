const Joi = require("joi");

module.exports = Joi.object({
  email: Joi.string()
    .pattern(/^[\w\-.]+@([\w-]+\.)+[\w-]+$/)
    .required(),
  password: Joi.string()
    .required(),
}).required();