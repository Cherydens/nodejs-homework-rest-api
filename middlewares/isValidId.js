const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../utils');

/**
 * Middleware function to validate if a given ID is a valid MongoDB ObjectId.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Next function to pass control to the next middleware
 */
const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!isValidObjectId(contactId)) {
    next(new HttpError(400, `${contactId} is not valid id`));
  }

  // Continue with the next middleware or route handler if the ID is valid
  next();
};

module.exports = isValidId;
