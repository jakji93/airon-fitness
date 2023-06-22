const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserInfoSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('UserInfo', UserInfoSchema);
