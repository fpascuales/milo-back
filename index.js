require("dotenv").config();
require("./src/utils/passport");

const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const API_FRONT = process.env.API_FRONT;
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const server = express();

const corsOptions = {
    origin: API_FRONT,
    credentials: true
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(
    session({
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'none',
            secure: true
        }
    })
);
server.use(passport.initialize());
server.use(passport.session());

const db = require("./src/utils/db.js");
db.connectDB();

const usersRoutes = require('./src/api/users/users.routes.js');

server.use("/users", usersRoutes);

server.use("/", (req, res) => {
    res.status(200).send("It Works!")
})
server.use((err, req, res) => {
    return res.status(err.status || 500).json(err.message || "Error");
})
server.use("*", (req, res) => {
    return res.status(404).json({msg: 'Not Found'});
})
server.listen(PORT, () => {
    console.log("Server is running!");
})