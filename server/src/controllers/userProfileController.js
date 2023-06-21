const { userProfile1, userProfile2, userProfile3 } = require('../mock/UserProfileMockData');

// mocking with this object, acting as in-memory data store
// contains key-value pairs, where key is the userID and value is the profile object
const userProfiles = {};
userProfiles[userProfile1.userID] = userProfile1;
userProfiles[userProfile2.userID] = userProfile2;
userProfiles[userProfile3.userID] = userProfile3;

const getAllUserProfiles = (req, res) => {
  const allProfiles = Object.values(userProfiles);

  res.json(allProfiles);
};

const getUserProfileById = (req, res) => {
  const { userID } = req.params;
  const userProfile = userProfiles[userID];

  if (userProfile) {
    res.json(userProfile);
  } else {
    res.status(404).json({ error: 'User profile not found' });
  }
};

const createUserProfile = (req, res) => {
  const userProfile = req.body;

  userProfiles[userProfile.userID] = userProfile;
  res.status(201).json(userProfile);
};

const updateUserProfile = (req, res) => {
  const { userID } = req.params;
  const {
    apiKey,
    firstName,
    lastName,
    image,
    birthday,
    height,
    heightUnit,
    weight,
    weightUnit,
    experience,
    bodyMass,
    muscleMass,
    duration,
    numDayOfWeek,
    preference,
    equipment,
    allergyList,
    goalList,
    healthList,
    dietList,
  } = req.body;

  if (userProfiles[userID]) {
    userProfiles[userID] = {
      ...userProfiles[userID],
      apiKey,
      firstName,
      lastName,
      image,
      birthday,
      height,
      heightUnit,
      weight,
      weightUnit,
      experience,
      bodyMass,
      muscleMass,
      duration,
      numDayOfWeek,
      preference,
      equipment,
      allergyList,
      goalList,
      healthList,
      dietList,
    };
    res.json(userProfiles[userID]);
  } else {
    res.status(404).json({ error: 'User profile not found.' });
  }
};

const deleteUserProfileById = (req, res) => {
  const { userID } = req.params;

  if (userProfiles[userID]) {
    delete userProfiles[userID];
    res.json({ message: 'User profile deleted successfully.' });
  } else {
    res.status(404).json({ error: 'User profile not found.' });
  }
};

module.exports = {
  getAllUserProfiles,
  getUserProfileById,
  createUserProfile,
  updateUserProfile,
  deleteUserProfileById,
};
