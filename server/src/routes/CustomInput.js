const express = require('express');
const router = express.Router();

const list = [];

router.get('/:userID', (req, res) => {
  const userInputs = list.filter(item => item.userID === req.params.userID)
  res.send(userInputs);
});

router.post('/', (req, res) => {
  if(!req.body.input) {
    return res.status(400).send({message: "Missing Payload"});
  }
  const item = {userID: req.body.userID, input: req.body.input, timestamp: req.body.timestamp};
  list.push(item);
  return res.send(item);
});

module.exports = router;
