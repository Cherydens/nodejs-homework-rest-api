const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

const authRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');
const { dirNames } = require('./variables');

const app = express();

// Determine the logging format based on the environment
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// Middleware for request logging
app.use(logger(formatsLogger));

// Middleware for enabling CORS
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(express.json());

app.use(express.static(dirNames.PUBLIC_DIR));

// Routes for user authentication and contact management
app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);

// Middleware for handling 404 errors (Not Found)
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Middleware for handling errors and sending appropriate responses
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
