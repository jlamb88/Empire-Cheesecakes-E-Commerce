const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(
  // 'mongodb+srv://jlamb-admin:scotland1md@cluster0.dcrn6ph.mongodb.net/empire_db?retryWrites=true&w=majority',
  process.env.SERVER_MONGODB_URI, //|| 'mongodb://localhost:27017/empire_db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverAPI: ServerApiVersion.v1
  }
);

module.exports = mongoose.connection;

