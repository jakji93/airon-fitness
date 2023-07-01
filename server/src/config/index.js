const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((e) => {
    console.error('Connection error', e.message);
  });

const connectDB = mongoose.connection;

module.exports = connectDB;
