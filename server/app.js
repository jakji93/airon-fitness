const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config');

const userInfoRoute = require('./src/routes/UserInfo');
const userProfileRoute = require('./src/routes/UserProfile');
const workoutScheduleRoute = require('./src/routes/WorkoutSchedule');
const mealScheduleRoute = require('./src/routes/MealSchedule');
// const customInputRoute = require('./src/routes/CustomInput');

connectDB.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/userInfo', userInfoRoute);
app.use('/userProfile', userProfileRoute);
app.use('/workoutSchedule', workoutScheduleRoute);
app.use('/mealSchedule', mealScheduleRoute);
// app.use('/customInput', customInputRoute);

app.get('/', (req, res) => {
  res.send('Server connection established!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
