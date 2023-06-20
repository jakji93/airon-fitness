const express = require('express');
const router = express.Router();

const list = [];

// GET /custominput - retrieves every user inputs in chat function for user (userID)
// request format:
//     body: n/a
//     params: userID
//     query params: n/a
// returns:
//     [{userID: string, input: string, timestamp: string}]
router.get('/:userID', (req, res) => {
  const userInputs = list.filter(item => item.userID === req.params.userID)
  res.send(userInputs);
});


// POST /custominput - create new user input for user (userID)
// request format:
//     body: {userID: string, input: string, timestamp: string}
//     params: n/a
//     query params: n/a
// returns:
//     {userID: string, input: string, timestamp: string}
router.post('/', (req, res) => {
  if(!req.body.input) {
    return res.status(400).send({message: "Missing Payload"});
  }
  const item = {userID: req.body.userID, input: req.body.input, timestamp: req.body.timestamp};
  list.push(item);
  return res.send(item);
});

module.exports = router;
