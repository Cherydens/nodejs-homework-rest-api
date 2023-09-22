const Joi = require('joi');

const {
  validateErrorMessageList,
  regexpList,
  subscriptionList,
} = require('../../variables');

/**
 * Joi schema for validating the request body when registering a new user.
 */
const registerUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(regexpList.email).required(),
  subscription: Joi.string()
    .valid(...subscriptionList)
    .default(subscriptionList[0]),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when logging in a user.
 */
const loginUserSchema = Joi.object({
  password: registerUserSchema.extract('password'),
  email: registerUserSchema.extract('email'),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when updating a user's subscription.
 */
const updateSubscriptionUserSchema = Joi.object({
  subscription: registerUserSchema.extract('subscription').required(),
}).messages(validateErrorMessageList);

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateSubscriptionUserSchema,
};
