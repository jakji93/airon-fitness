const list = [];

const getCustomInputsByUser = (req, res) => {
  const userInputs = list.filter((item) => item.userID === req.params.userID);
  res.send(userInputs);
};

const addCustomInput = (req, res) => {
  if (!req.body.input) {
    return res.status(400).send({ message: 'Missing Payload' });
  }
  const item = { userID: req.body.userID, input: req.body.input, timestamp: req.body.timestamp };
  list.push(item);
  return res.send(item);
};

module.exports = {
  getCustomInputsByUser,
  addCustomInput,
};
