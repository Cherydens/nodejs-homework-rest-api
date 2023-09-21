const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');
const { regexpList } = require('../variables');

/**
 * Schema for the Contact model.
 */
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: [regexpList.email, 'Email must be valid'],
    },
    phone: {
      type: String,
      match: [regexpList.phone, 'Phone must be valid'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Set owner for contact'],
    },
  },
  { versionKey: false, timestamps: true }
);

// Handle Mongoose save errors using a post middleware
contactSchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'contact' collection using the contactSchema.
 */
const Contact = model('contact', contactSchema);

module.exports = Contact;
