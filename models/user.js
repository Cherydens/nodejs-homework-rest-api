const { Schema, model } = require('mongoose');

const { handleMongooseError } = require('../utils');
const { regexpList, subscriptionList } = require('../variables');

/**
 * Schema for the User model.
 */
const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: [6, 'Password min length 6 characters'],
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: [regexpList.email, 'Email must be valid'],
      required: [true, 'Email is required'],
      unique: [true, 'Email in use'],
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: subscriptionList[0],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false }
);

// Handle Mongoose save errors using a post middleware
userSchema.post('save', handleMongooseError);

/**
 * Mongoose model for the 'user' collection using the userSchema.
 */
const User = model('user', userSchema);

module.exports = User;
