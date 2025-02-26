const mongoose = require("mongoose");

const db = mongoose
    .connect(process.env.MONGODB_URI, {
        dbName: process.env.MONGODB_DBNAME
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.error(err));

module.exports = db;