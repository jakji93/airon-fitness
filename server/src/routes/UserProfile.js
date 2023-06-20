const express = require('express');
const router = express.Router();
const { userProfile1, userProfile2, userProfile3 } = require('./mock/UserProfileMockData');

// mocking with this object, acting as in-memory data store
// contains key-value pairs, where key is the userID and value is the profile object
const userProfiles = {};

// store mock profiles 1, 2, and 3 in the userProfiles object
userProfiles[userProfile1.userID] = userProfile1;
userProfiles[userProfile2.userID] = userProfile2;
userProfiles[userProfile3.userID] = userProfile3;

// GET /userprofile
router.get('/', (req, res) => {
  // Retrieve all user profiles
  const allProfiles = Object.values(userProfiles);
  res.json(allProfiles);
});

// GET /userprofile/:userID
router.get('/:userID', (req, res) => {
  const { userID } = req.params; // destructuring syntax equivalent to   const userID = req.params.userID;

  // TODO: database retrieval here
  const userProfile = userProfiles[userID];

  if (userProfile) {
    res.json(userProfile);
  } else {
    res.status(404).json({ error: 'User profile not found' });
  }
});

// POST /userprofile
router.post('/', (req, res) => {
  
  console.log("Hello");
  console.log(req.body);

  // create the user profile object
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

  // TODO: database store here
  userProfiles[userID] = userProfile;
  res.status(201).json(userProfile);
});

// PUT /userprofile/:userID
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

  // Update the user profile object
  // See the updated mock object for testing in the mock directory
  if (userProfiles[userID]) {

    // TODO: database update
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

// DELETE /userprofile/:userID
router.delete('/:userID', (req, res) => {
  const { userID } = req.params;

  // Check if the user profile exists
  if (userProfiles[userID]) {
    // TODO: Perform database deletion or any necessary cleanup

    // Delete the user profile
    delete userProfiles[userID];

    res.json({ message: 'User profile deleted successfully.' });
  } else {
    res.status(404).json({ error: 'User profile not found.' });
  }
});

module.exports = router;