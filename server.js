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
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors(corsOptions));
app.use('/team-contract', AddressRoute);
app.use('/team-submission', SubmissionRoute);
module.exports = app;