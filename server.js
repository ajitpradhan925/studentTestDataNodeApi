const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');

// Add environment values
dotenv.config({ path: './config/config.env'});

// Connect to database
connectDb();

const app = express();


app.use(morgan('dev'));

// Include body parser
app.use(express.json());
app.use(express.json({
    extended: true
}));

app.use('/api', require('./routes/student'));

const port = 3000 || process.env.PORT;

const server = app.listen(port, 
    console.log(`Server is running on port ${port}`.yellow.underline)
);



// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.green);
    // Close server & exit process
    server.close(() => process.exit(1));
  });

