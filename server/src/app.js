const express = require('express');
let cors = require('cors');
const app = express();
const port = 3000;

const userInfoRoute = require('./routes/UserInfo');
const userProfileRoute = require('./routes/UserInfo');
const workoutScheduleRoute = require('./routes/WorkoutSchedule');
const mealScheduleRoute = require('./routes/MealSchedule');
const customInputRoute = require('./routes/CustomInput');

app.use(cors());
app.use('/userinfo', userInfoRoute);
app.use('/userprofile', userInfoRoute);
app.use('/workoutschedule', workoutScheduleRoute);
app.use('/mealschedule', mealScheduleRoute);
app.use('/custominput', customInputRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
