const express = require('express');
const router = express.Router();
const { userProfile1, userProfile2, userProfile3 } = require('./mock/UserProfileMockData');

// mocking with this object, acting as in-memory data store
// contains key-value pairs, where key is the userID and value is the profile object
const userProfiles = {};
userProfiles[userProfile1.userID] = userProfile1;
userProfiles[userProfile2.userID] = userProfile2;
userProfiles[userProfile3.userID] = userProfile3;

// GET /userprofile - returns a list of all the user profiles
router.get('/', (req, res) => {
  const allProfiles = Object.values(userProfiles);

  res.json(allProfiles);
});

// GET /userprofile/:userID
router.get('/:userID', (req, res) => {
  const { userID } = req.params;
  const userProfile = userProfiles[userID];

  if (userProfile) {
    res.json(userProfile);
  } else {
    res.status(404).json({ error: 'User profile not found' });
  }
});

// POST /userprofile
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

// DELETE /userprofile/:userID
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