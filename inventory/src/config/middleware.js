// middleware.js

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

module.exports = (app) => {
    app.use(cors()); // Enable CORS for all routes
    app.use(bodyParser.json()); // Parse JSON request bodies
    app.use(express.json()); // Additional JSON parsing (optional)
};
