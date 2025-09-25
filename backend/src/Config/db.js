const mongoose = require('mongoose');
const cli = require("cli-color");
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI)
    .then(() => {
        console.log(cli.white.bgBlue('==============================='));
        console.log('MongoDB connected successfully');
        console.log(cli.white.bgBlue('==============================='));
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
  } catch (error) {
    console.error('Unexpected error:', error);
  } 
};

module.exports = connectDB;