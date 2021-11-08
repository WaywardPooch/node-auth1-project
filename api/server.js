/*
  Do what needs to be done to support sessions with the `express-session` package!
  To respect users' privacy, do NOT send them a cookie unless they log in.
  This is achieved by setting 'saveUninitialized' to false, and by not
  changing the `req.session` object unless the user authenticates.

  Users that do authenticate should have a session persisted on the server,
  and a cookie set on the client. The name of the cookie should be "chocolatechip".

  The session can be persisted in memory (would not be adecuate for production)
  or you can use a session store like `connect-session-knex`.
*/

// Imports
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const db = require("./../data/db-config");
const helmet = require("helmet");
const usersRouter = require("./users/users-router");
const Store = require("connect-session-knex")(session);

// Server instantiation
const server = express();

// Middleware
server.use(helmet());
server.use(express.json());
server.use(cors());

// Session setup
server.use(session({
  name: "client",
  cookie: {
    maxAge: 1000 * 60 * 5,
    secure: false,
    httpOnly: false
  },
  resave: false,
  saveUninitialized: false,
  store: new Store({
    knex: db,
    tablename: "sessions",
    sidfieldname: "session_id",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}));

// Routes
server.use("/api/users", usersRouter);

// Endpoints
server.get("/", (req, res) => {
  res.json({ api: "up" });
});

// Error handler
server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

// Exports
module.exports = server;
