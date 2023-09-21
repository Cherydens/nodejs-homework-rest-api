/**
 * Multer middleware configuration for uploading images.
 */
const multer = require('multer');
const path = require('path');

const { HttpError } = require('../utils');
const { fileTypes, dirNames } = require('../variables');

// Define the temporary directory path
const TEMP_DIR = path.join(__dirname, '..', dirNames.TEMP_DIR);

// Configure Multer storage settings
const multerConfig = multer.diskStorage({
  destination: TEMP_DIR,
  filename: (req, file, cb) => {
    // Use the original filename for the uploaded file
    cb(null, file.originalname);
  },
});

// Create a Multer middleware instance for image uploads
const uploadImage = multer({
  storage: multerConfig,
  limits: { fileSize: 2000000 }, // Limit file size to 2MB
  fileFilter: (req, file, cb) => {
    // Check if the uploaded file is an image based on its MIME type
    if (file.mimetype.includes(fileTypes.IMAGE)) {
      cb(null, true); // Accept the file
      return;
    }
    // Reject the file with a 400 Bad Request error if it's not an image
    cb(new HttpError(400, `File type must be an ${fileTypes.IMAGE}`), false);
  },
});

module.exports = uploadImage;

// This code documents the configuration of a Multer middleware for uploading images. Here's the breakdown of the documentation:

// The code sets up Multer to handle file uploads, specifically for images.

// The TEMP_DIR constant defines the path to the temporary directory where uploaded files will be stored before processing.

// The multerConfig object configures Multer's storage settings, specifying the destination directory for uploaded files and naming each file with its original name.

// The uploadImage Multer middleware instance is created with the following configurations:

// storage: Uses the multerConfig settings for file storage.
// limits: Specifies a file size limit of 2MB for uploaded images.
// fileFilter: Defines a filter function to check if the uploaded file is an image based on its MIME type. If the file is not an image, it rejects it with a 400 Bad Request error.
// Finally, the uploadImage middleware is exported for use in other parts of the application.

// This documentation explains the purpose and configuration of the Multer middleware for image uploads in your code.
