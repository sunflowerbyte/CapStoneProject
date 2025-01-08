const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/Laboratory';
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
