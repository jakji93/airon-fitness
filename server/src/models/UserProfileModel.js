const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema(
  {
    userInfoID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'UserInfo',
    },
    birthday: {
      type: Date,
      required: [true, 'Please add a birthday'],
    },
    gender: {
      type: String,
      required: [true, 'Please add a gender'],
    },
    height: {
      type: Number,
      required: false,
    },
    heightUnit: {
      type: String,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    weightUnit: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      required: [true, 'Please add an experience'],
    },
    bodyFat: {
      type: Number,
      required: false,
    },
    muscleMass: {
      type: Number,
      required: false,
    },
    allergies: {
      type: [String],
      required: false,
    },
    duration: {
      type: Number,
      required: false,
    },
    weeklyAvailability: {
      type: Number,
      required: false,
    },
    preference: {
      type: [String],
      required: false,
    },
    equipment: {
      type: [String],
      required: false,
    },
    goals: {
      type: [String],
      required: [true, 'Please add goals'],
    },
    healthConditions: {
      type: [String],
      required: false,
    },
    dietRestriction: {
      type: [String],
      required: false,
    },
    apiKey: {
      type: String,
      required: [true, 'Please add API key'],
    },
    firstName: {
      type: String,
      required: [true, 'Please add first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add last name'],
    },
    profileImage: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('UserProfile', UserProfileSchema);
