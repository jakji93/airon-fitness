const express = require('express');
let cors = require('cors');
const app = express();
const port = 3000;

const userInfoRoute = require('./src/routes/UserInfo');
const userProfileRoute = require('./src/routes/UserProfile');
const workoutScheduleRoute = require('./src/routes/WorkoutSchedule');
const mealScheduleRoute = require('./src/routes/MealSchedule');
const customInputRoute = require('./src/routes/CustomInput');

app.use(cors());
app.use(express.json());
app.use('/userinfo', userInfoRoute);
app.use('/userprofile', userProfileRoute);
app.use('/workoutschedule', workoutScheduleRoute);
app.use('/mealschedule', mealScheduleRoute);
app.use('/custominput', customInputRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
