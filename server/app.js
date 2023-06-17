const express = require('express');
let cors = require('cors');
const app = express();
const port = 3000;

const userInfoRoute = require('./routes/UserInfo');
const userProfileRoute = require('./routes/UserInfo');

app.use(cors());
app.use('/userinfo', userInfoRoute);
app.use('/userprofile', userInfoRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
