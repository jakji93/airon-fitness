const express = require('express');
const multer = require('multer');
const {
  getUserProfileById,
  createUserProfile,
  updateUserProfile,
  deleteUserProfileById,
  getPaginatedScheduleHistory,
} = require('../controllers/userProfileController');
const {
  generateSchedules,
} = require('../controllers/scheduleGenerationController');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

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
 *    "birthday": date,
 *    "gender": string,
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
router.get('/', protect, getUserProfileById);

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
 *      "birthday": date,
 *      "gender": string,
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
router.post('/', protect, upload.single('file'), createUserProfile);

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
 *      "birthday": date,
 *      "gender": string,
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
router.put('/', protect, upload.single('file'), updateUserProfile);

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
router.delete('/', protect, deleteUserProfileById);

/**
 * @desc generate workout and meal schedules based on user profile information
 * @access Private
 * @route POST /userProfile/generate
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response object containing both schedules
 * {
 *  "userInfoID": string,
 *  "workoutSchedule": {
 *    "Monday": {
 *       "exercises": [
 *          ...
 *        ],
 *       "total_calories"
 *    }, ...
 *   },
 *  "mealSchedule" {
 *    "Monday": {
 *      "breakfast": string
 *       ...
 *    }, ...
 * }
 */
router.post('/generate', protect, generateSchedules);

/**
 * @desc retrieve paginated history of user workout and meal schedules in chronological order
 * @access Private
 * @route POST /userProfile/history
 * @request
 *  body: {
 *    "page": number
 *  }
 *  params: n/a
 *  query params: n/a
 * @response object containing page of history with pagination information
 * {
 *  "pagination": {
 *    "page": number,
 *    "max": number,
 *    "schedules": [
 *    {
 *      "Monday": {
 *        "exercises": [
 *            ...
 *          ],
 *        "total_calories"
 *      },
 *    {
 *      "Monday": {
 *        "breakfast": string
 *       ...
 *      }, ...
 *    ]
 *  }
 * }
 */
router.post('/history', protect, getPaginatedScheduleHistory);

module.exports = router;
