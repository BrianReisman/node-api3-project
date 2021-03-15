const express = require('express');

const userRouter = require('./users/users-router'); //*the endpoint routes for /

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
// global middlewares and the user's router need to be connected here


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware boissss!</h2>`);
});

module.exports = server;
