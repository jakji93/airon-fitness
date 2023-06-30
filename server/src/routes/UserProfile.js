const express = require('express');
const {
  getAllUserProfiles,
  getUserProfileById,
  createUserProfile,
  updateUserProfile,
  deleteUserProfileById,
} = require('../controllers/userProfileController');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

/**
 * @desc creturns a list of all the user profiles
 * @access Private
 * @route GET /userProfile
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response list of all user profile objects
 *   [
 *     {
 *         "userID": string,
 *         "apiKey": string,
 *         "firstName": string,
 *         "lastName": string,
 *         "image": string,
 *         "birthday": string,
 *         "height": number,
 *         "heightUnit": string,
 *         "weight": number,
 *         "weightUnit": string,
 *         "experience": string,
 *         "bodyMass": number,
 *         "muscleMass": number,
 *         "duration": number.
 *         "numDayOfWeek": number
 *         "preference": string,
 *         "equipment": [
 *             ...string
 *         ],
 *         "allergyList": [
 *             ...string
 *         ],
 *         "goalList": [
 *             ...string
 *         ],
 *         "healthList": [
 *             ...string
 *         ],
 *         "dietList": [
 *             ..string
 *         ]
 *     },
 *     {...},
 *     ...
 *   ]
 */
router.get('/', protect, getAllUserProfiles);

/**
 * @desc return the user profile with userID
 * @access Private
 * @route GET /userProfile/:userID
 * @request
 *  body: n/a
 *  params: userID
 *  query params: n/a
 * @response
 *  {
 *    "userID": string,
 *    "apiKey": string,
 *    "firstName": string,
 *    "lastName": string,
 *    "image": string,
 *    "birthday": string,
 *    "height": number,
 *    "heightUnit": string,
 *    "weight": number,
 *    "weightUnit": string,
 *    "experience": string,
 *    "bodyMass": number,
 *    "muscleMass": number,
 *    "duration": number.
 *    "numDayOfWeek": number
 *    "preference": string,
 *    "equipment": [
 *        ...string
 *    ],
 *    "allergyList": [
 *        ...string
 *    ],
 *    "goalList": [
 *        ...string
 *    ],
 *    "healthList": [
 *        ...string
 *    ],
 *    "dietList": [
 *        ..string
 *    ]
 *  }
 */
router.get('/:userID', protect, getUserProfileById);

/**
 * @desc create a new user profile
 * @access Private
 * @route POST /userProfile
 * @request
 *  body:
 *    {
 *      "userID": string,
 *      "apiKey": string,
 *      "firstName": string,
 *      "lastName": string,
 *      "image": string,
 *      "birthday": string,
 *      "height": number,
 *      "heightUnit": string,
 *      "weight": number,
 *      "weightUnit": string,
 *      "experience": string,
 *      "bodyMass": number,
 *      "muscleMass": number,
 *      "duration": number.
 *      "numDayOfWeek": number
 *      "preference": string,
 *      "equipment": [
 *          ...string
 *      ],
 *      "allergyList": [
 *          ...string
 *      ],
 *      "goalList": [
 *          ...string
 *      ],
 *      "healthList": [
 *          ...string
 *      ],
 *      "dietList": [
 *          ..string
 *      ]
 *    }
 *  params: n/a
 *  query params: n/a
 * @response status code + copy of above request body on success
 */
router.post('/', protect, createUserProfile);

/**
 * @desc update a user profile with userID
 * @access Private
 * @route PUT /userProfile/:userID
 * @request
 *  body:
 *    {
 *      "userID": string,
 *      "apiKey": string,
 *      "firstName": string,
 *      "lastName": string,
 *      "image": string,
 *      "birthday": string,
 *      "height": number,
 *      "heightUnit": string,
 *      "weight": number,
 *      "weightUnit": string,
 *      "experience": string,
 *      "bodyMass": number,
 *      "muscleMass": number,
 *      "duration": number.
 *      "numDayOfWeek": number
 *      "preference": string,
 *      "equipment": [
 *          ...string
 *      ],
 *      "allergyList": [
 *          ...string
 *      ],
 *      "goalList": [
 *          ...string
 *      ],
 *      "healthList": [
 *          ...string
 *      ],
 *      "dietList": [
 *          ..string
 *      ]
 *    }
 *  params: n/a
 *  query params: n/a
 * @response status code + copy of above request body on success
 */
router.put('/:userID', protect, updateUserProfile);

/**
 * @desc delete a user profile with userID
 * @access Private
 * @route DELETE /userProfile/:userID
 * @request
 *  body: n/a
 *  params: userID
 *  query params: n/a
 * @response success message or error message if user not found
 *    { "message": "User profile deleted successfully." }
 *    { "error": "User profile not found." }
 */
router.delete('/:userID', protect, deleteUserProfileById);

module.exports = router;
