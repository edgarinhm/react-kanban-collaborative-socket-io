const express = require('express');
const { httpStatus } = require('../constants/http-constants');
const { tasks } = require('../data/tasks');
const homeRouter = express.Router();

homeRouter.get("/home", (req, res) => {
    res.json(tasks);
});

module.exports = homeRouter