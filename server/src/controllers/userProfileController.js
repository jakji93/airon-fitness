const { userProfile1, userProfile2, userProfile3 } = require('../mock/UserProfileMockData');

// mocking with this object, acting as in-memory data store
// contains key-value pairs, where key is the userID and value is the profile object
const userProfiles = {};
userProfiles[userProfile1.userID] = userProfile1;
userProfiles[userProfile2.userID] = userProfile2;
userProfiles[userProfile3.userID] = userProfile3;

/**
 * @desc    creturns a list of all the user profiles
 * @route   GET /userProfile
 * @access  Private
 */
const getAllUserProfiles = (req, res) => {
  const allProfiles = Object.values(userProfiles);

  res.json(allProfiles);
};

/**
 * @desc    return the user profile with userID
 * @route   GET /userProfile/:userID
 * @access  Private
 */
const getUserProfileById = (req, res) => {
  const { userID } = req.params;
  const userProfile = userProfiles[userID];

  if (userProfile) {
    res.json(userProfile);
  } else {
    res.status(404).json({ error: 'User profile not found' });
  }
};

/**
 * @desc    create a new user profile
 * @route   POST /userProfile
 * @access  Private
 */
const createUserProfile = (req, res) => {
  const userProfile = req.body;

  userProfiles[userProfile.userID] = userProfile;
  res.status(201).json(userProfile);
};

/**
 * @desc    update a user profile with userID
 * @route   PUT /userProfile/:userID
 * @access  Private
 */
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

/**
 * @desc    delete a user profile with userID
 * @route   DELETE /userProfile/:userID
 * @access  Private
 */
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
