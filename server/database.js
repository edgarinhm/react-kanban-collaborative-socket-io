const mongoose = require("mongoose");

const db = mongoose
    .connect(process.env.MONGODB_URI, {
        dbName: process.env.MONGODB_DBNAME
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.error('MONGODB_URI', process.env.MONGODB_URI, 'MONGODB_DBNAME', process.env.MONGODB_DBNAME, err));

module.exports = db;