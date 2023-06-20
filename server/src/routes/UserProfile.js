const express = require('express');
const router = express.Router();
const { userProfile1, userProfile2, userProfile3 } = require('./mock/UserProfileMockData');

// mocking with this object, acting as in-memory data store
// contains key-value pairs, where key is the userID and value is the profile object
const userProfiles = {};
userProfiles[userProfile1.userID] = userProfile1;
userProfiles[userProfile2.userID] = userProfile2;
userProfiles[userProfile3.userID] = userProfile3;

// GET /userProfile - returns a list of all the user profiles
// request format:
//     body: n/a
//     params: n/a
//     query params: n/a
// returns:
// [
//   {
//       "userID": string,
//       "api_key": string,
//       "first_name": string,
//       "last_name": string,
//       "image": string,
//       "birthday": string,
//       "height": number,
//       "height_unit": string,
//       "weight": number,
//       "weight_unit": string,
//       "experience": string,
//       "body_mass": number,
//       "muscle_mass": number,
//       "duration": number.
//       "num_day_of_week": number
//       "preference": string,
//       "equipment": [
//           ...string
//       ],
//       "allergyList": [
//           ...string
//       ],
//       "goalList": [
//           ...string
//       ],
//       "healthList": [
//           ...string
//       ],
//       "dietList": [
//           ..string
//       ]
//   },
//   {
//    ...
//   },
//   ...
// ]
router.get('/', (req, res) => {
  const allProfiles = Object.values(userProfiles);

  res.json(allProfiles);
});

// GET /userProfile/:userID - return the user profile with userID
// request format:
//     body: n/a
//     params: userID
//     query params: n/a
// returns:
// {
//     "userID": string,
//     "api_key": string,
//     "first_name": string,
//     "last_name": string,
//     "image": string,
//     "birthday": string,
//     "height": number,
//     "height_unit": string,
//     "weight": number,
//     "weight_unit": string,
//     "experience": string,
//     "body_mass": number,
//     "muscle_mass": number,
//     "duration": number.
//     "num_day_of_week": number
//     "preference": string,
//     "equipment": [
//         ...string
//     ],
//     "allergyList": [
//         ...string
//     ],
//     "goalList": [
//         ...string
//     ],
//     "healthList": [
//         ...string
//     ],
//     "dietList": [
//         ..string
//     ]
// }
router.get('/:userID', (req, res) => {
  const { userID } = req.params;
  const userProfile = userProfiles[userID];

  if (userProfile) {
    res.json(userProfile);
  } else {
    res.status(404).json({ error: 'User profile not found' });
  }
});

// POST /userProfile - create a new user profile
// request format:
//     body: 
//     {
//        "userID": string,
//        "api_key": string,
//        "first_name": string,
//        "last_name": string,
//        "image": string,
//        "birthday": string,
//        "height": number,
//        "height_unit": string,
//        "weight": number,
//        "weight_unit": string,
//        "experience": string,
//        "body_mass": number,
//        "muscle_mass": number,
//        "duration": number.
//        "num_day_of_week": number
//        "preference": string,
//        "equipment": [
//            ...string
//        ],
//        "allergyList": [
//            ...string
//        ],
//        "goalList": [
//            ...string
//        ],
//        "healthList": [
//            ...string
//        ],
//        "dietList": [
//            ..string
//        ]
//     }
//     params: n/a
//     query params: n/a
// returns:
//     status code + copy of above request body on success
router.post('/', (req, res) => {
  const userProfile = {
    userID,
    api_key,
    first_name,
    last_name,
    image,
    birthday,
    height,
    height_unit,
    weight,
    weight_unit,
    experience,
    body_mass,
    muscle_mass,
    duration,
    num_day_of_week,
    preference,
    equipment,
    allergyList,
    goalList,
    healthList,
    dietList
  } = req.body;

  userProfiles[userID] = userProfile;
  res.status(201).json(userProfile);
});

// PUT /userProfile/:userID - update a user profile with userID
// request format:
//     body: 
//     {
//        "userID": string,
//        "api_key": string,
//        "first_name": string,
//        "last_name": string,
//        "image": string,
//        "birthday": string,
//        "height": number,
//        "height_unit": string,
//        "weight": number,
//        "weight_unit": string,
//        "experience": string,
//        "body_mass": number,
//        "muscle_mass": number,
//        "duration": number.
//        "num_day_of_week": number
//        "preference": string,
//        "equipment": [
//            ...string
//        ],
//        "allergyList": [
//            ...string
//        ],
//        "goalList": [
//            ...string
//        ],
//        "healthList": [
//            ...string
//        ],
//        "dietList": [
//            ..string
//        ]
//     }
//     params: userID
//     query params: n/a
// returns:
//     status code + copy of updated request body on success
router.put('/:userID', (req, res) => {
  const { userID } = req.params;
  const {
    api_key,
    first_name,
    last_name,
    image,
    birthday,
    height,
    height_unit,
    weight,
    weight_unit,
    experience,
    body_mass,
    muscle_mass,
    duration,
    num_day_of_week,
    preference,
    equipment,
    allergyList,
    goalList,
    healthList,
    dietList
  } = req.body;

  if (userProfiles[userID]) {
    userProfiles[userID] = {
      ...userProfiles[userID],
      api_key,
      first_name,
      last_name,
      image,
      birthday,
      height,
      height_unit,
      weight,
      weight_unit,
      experience,
      body_mass,
      muscle_mass,
      duration,
      num_day_of_week,
      preference,
      equipment,
      allergyList,
      goalList,
      healthList,
      dietList
    };
    res.json(userProfiles[userID]);
  } else {
    res.status(404).json({ error: 'User profile not found.' });
  }
});

// DELETE /userProfile/:userID - delete a user profile with userID
// request format:
//     body: n/a
//     params: userID
//     query params: n/a
// returns:
//     { string }
router.delete('/:userID', (req, res) => {
  const { userID } = req.params;

  if (userProfiles[userID]) {
    delete userProfiles[userID];
    res.json({ message: 'User profile deleted successfully.' });
  } else {
    res.status(404).json({ error: 'User profile not found.' });
  }
});

module.exports = router;