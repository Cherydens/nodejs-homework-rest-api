// The necessary modules and libraries are imported:
const express = require('express');

const { validateBody, isValidId, authenticate } = require('../../middlewares');
const controllers = require('../../controllers/contacts');
const { contactValidationSchemas } = require('../../utils');

// An Express router object is created:
const router = express.Router();

// Routes for handling various contact-related requests are added to this router:

// Route for getting a list of contacts (GET /):
router.get('/', authenticate, controllers.listContacts);

// Route for getting a specific contact by its ID (GET /:contactId):
router.get('/:contactId', authenticate, isValidId, controllers.getContactById);

// Route for creating a new contact (POST /):
router.post(
  '/',
  authenticate,
  validateBody(contactValidationSchemas.addContactSchema),
  controllers.addContact
);

// Route for updating an existing contact by its ID (PUT /:contactId):
router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(contactValidationSchemas.updateContactSchema),
  controllers.updateContact
);

// Route for updating the status of a contact (PATCH /:contactId/favorite):
router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(contactValidationSchemas.updateStatusContactSchema),
  controllers.updateStatusContact
);

// Route for deleting a contact by its ID (DELETE /:contactId):
router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  controllers.removeContact
);

module.exports = router;
