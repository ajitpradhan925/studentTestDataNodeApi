const express  = require('express');
const morgan  = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');

// use dotenv files
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

app.use(morgan('dev'));
// body parser
app.use(express.json());
app.use(express.json({
    extended: true
}));

// use routes
app.use('/api/student', require('./routes/student'));



const PORT = 3000 || PORT;
const server = app.listen(3000,
    console.log(`Server is rinning on port ${PORT}`.yellow.bold)
);


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.green);
    // Close server & exit process
    server.close(() => process.exit(1));
  });

