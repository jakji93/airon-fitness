const express = require('express');
const { getCustomInputsByUser, addCustomInput } = require('../controllers/customInputController');

const router = express.Router();

/**
 * @desc retrieves every user inputs in chat function for user (userID)
 * @route GET /customInput/:userID
 * @request
 *  body: n/a
 *  params: userID
 *  query params: n/a
 * @response array of customInputs
 *  [{userID: string, input: string, timestamp: string}]
 */
router.get('/:userID', getCustomInputsByUser);

/**
 * @desc create new user input for user (userID)
 * @route POST /customInput
 * @request
 *  body: {userID: string, input: string, timestamp: string}
 *  params: n/a
 *  query params: n/a
 * @response added customInputs
 *  {userID: string, input: string, timestamp: string}
 */
router.post('/', addCustomInput);

module.exports = router;
