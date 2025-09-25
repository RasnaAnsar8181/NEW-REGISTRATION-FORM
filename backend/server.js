const express = require('express');
const cli = require("cli-color");
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/Config/db');
const userRoutes = require('./src/Route/userRouter');

// Load environment variables
dotenv.config();    

const app = express();

// Connect to MongoDB
connectDB();    
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("")
    console.log(cli.white.bgBlue('==============================='));
    console.log(`Server is running on port ${PORT}`);
    console.log(cli.white.bgBlue('==============================='));
    console.log("")
})