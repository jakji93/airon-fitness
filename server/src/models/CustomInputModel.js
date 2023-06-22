const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomInputSchema = new Schema(
  {
    userInfoID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'UserInfo',
    },
    userInput: {
      type: String,
      required: [true, 'Please add an input'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('CustomInput', CustomInputSchema);
