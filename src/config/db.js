const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('-Mongodb connected-');
  } catch (err) {
    console.log('--db connection error--', err.message);
    process.exit(1)
  }
}
module.exports = connectDb;