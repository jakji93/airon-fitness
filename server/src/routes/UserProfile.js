const express = require('express');
const {
  getUserProfileById,
  createUserProfile,
  updateUserProfile,
} = require('../controllers/userProfileController');

const router = express.Router();

// Don't think we should give access to all profiles
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
// router.get('/', getAllUserProfiles);

/**
 * @desc return the user profile with userInfoID (get userInfoID from JWT token)
 * @access Private
 * @route GET /userProfile/
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response
 *  {
 *    "apiKey": string,
 *    "firstName": string,
 *    "lastName": string,
 *    "profileImage": string,
 *    "birthday": string,
 *    "height": number,
 *    "heightUnit": string,
 *    "weight": number,
 *    "weightUnit": string,
 *    "experience": string,
 *    "bodyFat": number,
 *    "muscleMass": number,
 *    "duration": number.
 *    "weeklyAvailability": number
 *    "preference": [
 *        ...string
 *    ],
 *    "equipment": [
 *        ...string
 *    ],
 *    "allergies": [
 *        ...string
 *    ],
 *    "goals": [
 *        ...string
 *    ],
 *    "healthConditions": [
 *        ...string
 *    ],
 *    "dietRestriction": [
 *        ..string
 *    ]
 *  }
 */
router.get('/', getUserProfileById);

/**
 * @desc create a new user profile (get userInfoID from JWT token)
 * @access Private
 * @route POST /userProfile
 * @request
 *  body:
 *    {
 *      "apiKey": string,
 *      "firstName": string,
 *      "lastName": string,
 *      "profileImage": string,
 *      "birthday": string,
 *      "height": number,
 *      "heightUnit": string,
 *      "weight": number,
 *      "weightUnit": string,
 *      "experience": string,
 *      "bodyFat": number,
 *      "muscleMass": number,
 *      "duration": number.
 *      "weeklyAvailability": number
 *      "preference": [
 *          ...string
 *      ],
 *      "equipment": [
 *          ...string
 *      ],
 *      "allergies": [
 *          ...string
 *      ],
 *      "goals": [
 *          ...string
 *      ],
 *      "healthConditions": [
 *          ...string
 *      ],
 *      "dietRestriction": [
 *          ..string
 *      ]
 *    }
 *  params: n/a
 *  query params: n/a
 * @response status code + copy of above request body on success
 */
router.post('/', createUserProfile);

/**
 * @desc update a user profile with userInfoID (get userInfoID from JWT token)
 * @access Private
 * @route PUT /userProfile/
 * @request
 *  body:
 *    {
 *      "apiKey": string,
 *      "firstName": string,
 *      "lastName": string,
 *      "profileImage": string,
 *      "birthday": string,
 *      "height": number,
 *      "heightUnit": string,
 *      "weight": number,
 *      "weightUnit": string,
 *      "experience": string,
 *      "bodyFat": number,
 *      "muscleMass": number,
 *      "duration": number.
 *      "weeklyAvailability": number
 *      "preference": [
 *          ...string
 *      ],
 *      "equipment": [
 *          ...string
 *      ],
 *      "allergies": [
 *          ...string
 *      ],
 *      "goals": [
 *          ...string
 *      ],
 *      "healthConditions": [
 *          ...string
 *      ],
 *      "dietRestriction": [
 *          ..string
 *      ]
 *    }
 *  params: n/a
 *  query params: n/a
 * @response status code + copy of above request body on success
 */
router.put('/', updateUserProfile);

// May not implement this, maybe we allow profile to exist forever
/**
 * @desc delete a user profile with userInfoID (get userInfoID from JWT token)
 * @access Private
 * @route DELETE /userProfile/
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response success message or error message if user not found
 *    { "message": "User profile deleted successfully." }
 *    { "error": "User profile not found." }
 */
// router.delete('/', deleteUserProfileById);

module.exports = router;
