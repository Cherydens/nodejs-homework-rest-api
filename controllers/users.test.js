const request = require('supertest');
const app = require('../app');
const mongoServer = require('../server');
const { EMAIL_LOGIN_TEST, PASSWORD_LOGIN_TEST } = process.env;

// Define the login credentials
const body = { email: EMAIL_LOGIN_TEST, password: PASSWORD_LOGIN_TEST };

// Describe the tests for the Login Controller (login/signin)
describe('Tests for the Login Controller (login/signin)', () => {
  // Set up: Connect to the MongoDB server before running tests
  beforeAll(() => {
    mongoServer.connect();
  });

  // Tear down: Disconnect from the MongoDB server after running tests
  afterAll(() => {
    mongoServer.disconnect();
  });

  // Test 1: Verify that the response has a status code of 200
  test('Response must have a status code of 200', async () => {
    const res = await request(app).post('/api/users/login').send(body);
    expect(res.status).toBe(200);
  });

  // Test 2: Verify that a token is returned in the response
  test('The token must be returned in the response', async () => {
    const res = await request(app).post('/api/users/login').send(body);
    expect(res.body.token).toBeDefined();
  });

  // Test 3: Verify that the response returns a user object with email and subscription fields, both of type String
  test('The response should return a user object with email and subscription fields of data type String', async () => {
    const res = await request(app).post('/api/users/login').send(body);
    const user = res.body.user;

    expect(user).toBeDefined();
    expect(typeof user.email).toBe('string');
    expect(typeof user.subscription).toBe('string');
  });
});

// This code contains a series of tests for the Login Controller in an Express application. Here's the documentation for each part of the code:

// request, app, mongoServer, and the environment variables are imported for testing purposes.

// The login credentials (email and password) are defined in the body object.

// The describe block is used to group and label the tests related to the Login Controller.

// The beforeAll and afterAll hooks are used to set up and tear down the MongoDB connection before and after running the tests, ensuring a clean test environment.

// Three test cases are defined using test:

// The first test checks that the response from the login endpoint has a status code of 200.
// The second test verifies that a token is returned in the response.
// The third test checks that the response contains a user object with email and subscription fields, both of which are of data type String.
// These tests help ensure that the Login Controller functions correctly and returns the expected results when users log in to the application.
