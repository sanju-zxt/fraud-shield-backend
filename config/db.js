const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb://admin:Sanju%40123@ac-0umstsb-shard-00-00.mqdkskr.mongodb.net:27017,ac-0umstsb-shard-00-01.mqdkskr.mongodb.net:27017,ac-0umstsb-shard-00-02.mqdkskr.mongodb.net:27017/fraudshield?ssl=true&replicaSet=atlas-s77ki1-shard-0&authSource=admin&retryWrites=true&w=majority'
    );

    console.log('MongoDB Atlas Connected ✅');
  } catch (error) {
    console.error('DB Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;