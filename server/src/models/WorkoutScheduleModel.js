const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
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
  },
  { timestamps: true },
);

module.exports = mongoose.model('Workout', WorkoutSchema);
