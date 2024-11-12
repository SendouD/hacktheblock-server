const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AddressRoute = require("./Controllers/TeamAddressController");
const SubmissionRoute = require("./Controllers/SubmissionController");

require('dotenv').config();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionSuccessStatus: 200,
  };
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });
  

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('CORS configuration is set up!');
  });
app.use('/team-contract', AddressRoute);
app.use('/team-submission', SubmissionRoute);
module.exports = app;