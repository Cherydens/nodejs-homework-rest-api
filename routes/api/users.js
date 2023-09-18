// The necessary modules and libraries are imported:

const express = require('express');

const {
  validateBody,
  authenticate,
  uploadImage,
} = require('../../middlewares');
const controllers = require('../../controllers/users');
const { userValidationSchemas } = require('../../utils');

// An Express router object is created:
const router = express.Router();

// Routes for handling various user-related requests are added to this router. Here's their description:

// Route for user registration (POST /register):
router.post(
  '/register',
  validateBody(userValidationSchemas.registerUserSchema),
  controllers.registerUser
);

// Route for user login (POST /login):
router.post(
  '/login',
  validateBody(userValidationSchemas.loginUserSchema),
  controllers.loginUser
);

// Route for user logout (POST /logout):
router.post('/logout', authenticate, controllers.logoutUser);

// Route for getting the current user's information (GET /current):
router.get('/current', authenticate, controllers.getCurrentUser);

// Route for updating the user's subscription information (PATCH /):
router.patch(
  '/',
  authenticate,
  validateBody(userValidationSchemas.updateSubscriptionUserSchema),
  controllers.updateSubscriptionUser
);

// Route for updating the user's avatar (PATCH /):
router.patch(
  '/avatars',
  authenticate,
  uploadImage.single('avatar'),
  controllers.updateUserAvatar
);

//  The router object is exported for use in other parts of the program:
module.exports = router;

// This code creates an API for user registration, login, logout, retrieving the current user's information, updating the user's subscription status and updating the user's avatar. Middlewares like authenticate are used for user authentication, and validation schemas ensure that the request data is correct. Controllers handle the logic for these user-related operations.
