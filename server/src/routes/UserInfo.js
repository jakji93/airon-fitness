const express = require('express');
const {
  registerUser, loginUser, getMe,
} = require('../controllers/userInfoController');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

/**
 * @desc registers a new user, returns authentication token
 * @access Public
 * @route POST /userInfo
 * @request
 *  body:
 *    {
 *      "userID": string,
 *      "password": string,
 *      "email": string,
 *      "gptAPIKey": string,
 *      "firstName": string,
 *      "lastName": string,
 *      "profileImage": "testProfileImage"
 *    }
 *  params: n/a
 *  query params: n/a
 * @response
 *    {
 *      "userID": string,
 *      "email": string,
 *      "firstName": string,
 *      "lastName": string,
 *      "token": string"
 *    }
 */
router.post('/', registerUser);

/**
 * @desc returns token for user authentication
 * @access Public
 * @route POST /userInfo/login
 * @request
 *  body:
 *    {
 *      "email": string,
 *      "password": string,
 *    }
 *  params: n/a
 *  query params: n/a
 * @response
 *    {
 *      "userID": string,
 *      "email": string,
 *      "firstName": string,
 *      "lastName": string,
 *      "token": string"
 *    }
 */
router.post('/login', loginUser);

/**
 * @desc gets userInfo for user if authenticated
 * @access Private
 * @route GET /userInfo
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 *  Auth: Bearer token
 * @response
 *    {
 *      "userID": string,
 *      "email": string,
 *      "gptAPIKey": string,
 *      "firstName": string,
 *      "lastName": string,
 *      "profileImage": string,
 *    }
 */
router.get('/me', protect, getMe);

module.exports = router;
