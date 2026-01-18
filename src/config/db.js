const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("-Mongodb connected-");

    // 🔑 Sync indexes AFTER connect
    for (const modelName in mongoose.models) {
      await mongoose.models[modelName].syncIndexes();
    }

    console.log("All indexes synced");

  } catch (err) {
    console.error("--db connection error--", err.message);
    process.exit(1);
  }
};
module.exports = connectDb;