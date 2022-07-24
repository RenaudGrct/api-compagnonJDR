const Joi = require("joi");

module.exports = Joi.object({
  email: Joi.string()
    .pattern(/^[\w\-.]+@([\w-]+\.)+[\w-]+$/),
  username: Joi.string(),
  password: Joi.string()
    .pattern(/.{8,16}/),
}).min(1).required();