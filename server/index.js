const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const { CORS_ORIGIN, PORT } = require("./constants/environtment-constants");


const db = require("./database");
const { startSocketServer } = require('./server');

const socketIO = require('socket.io')(http, {
    cors: {
        origin: CORS_ORIGIN
    }
});

startSocketServer({ socketIO });

const loginRouter = require("./routes/login-router");
const homeRouter = require("./routes/home-router");

app.use(cors(CORS_ORIGIN));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", homeRouter);
app.use("/", loginRouter);

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});