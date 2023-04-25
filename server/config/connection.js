const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
require('dotenv').config()

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/empire_db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverAPI: ServerApiVersion.v1
  }
);

module.exports = mongoose.connection;
