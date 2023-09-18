const multer = require('multer');
const path = require('path');

const { HttpError } = require('../utils');
const { fileTypes } = require('../variables');

const TEMP_DIR = path.join(__dirname, '..', (process.env.TEMP_DIR = 'tmp'));

const multerConfig = multer.diskStorage({
  destination: TEMP_DIR,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImage = multer({
  storage: multerConfig,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes(fileTypes.IMAGE)) {
      cb(null, true);
      return;
    }
    cb(new HttpError(400, `File type must be an ${fileTypes.IMAGE}`), false);
  },
});

module.exports = uploadImage;
