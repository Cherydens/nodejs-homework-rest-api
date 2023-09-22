const Joi = require('joi');
const { validateErrorMessageList, regexpList } = require('../../variables');

/**
 * Joi schema for validating the request body when adding a contact.
 */
const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(regexpList.email).required(),
  phone: Joi.string().pattern(regexpList.phone).required(),
  favorite: Joi.boolean().default(false),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when updating a contact.
 */
const updateContactSchema = Joi.object({
  name: addContactSchema.extract('name').optional(),
  email: addContactSchema.extract('email').optional(),
  phone: addContactSchema.extract('phone').optional(),
  favorite: addContactSchema.extract('favorite').optional(),
})
  .min(1)
  .messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when updating the status of a contact.
 */
const updateStatusContactSchema = Joi.object({
  favorite: addContactSchema.extract('favorite').required(),
}).messages({
  ...validateErrorMessageList,
  'any.required': 'missing field favorite',
});

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
};
