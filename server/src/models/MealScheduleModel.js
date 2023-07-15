const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MealSchema = new Schema(
  {
    userInfoID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'UserInfo',
    },
    schedule: {
      type: Object,
      required: [true, 'Please add a schedule'],
    },
    inputs: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Meal', MealSchema);
