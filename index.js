require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AddressRoute = require("./Controllers/TeamAddressController");
const SubmissionRoute = require("./Controllers/SubmissionController");
const dbConnection = require('./config/dbconfig');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Manually set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Body parser for JSON
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('CORS configuration is set up!');
});
app.use('/team-contract', AddressRoute);
app.use('/team-submission', SubmissionRoute);
const startServer = async () => {
    const port = process.env.PORT || 5000;
    try {
        await dbConnection(process.env.MONGO_URI);
        app.listen(3001, () => {
            console.log(`Server is listening on ${port}`);
        });

    } catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
}

startServer();