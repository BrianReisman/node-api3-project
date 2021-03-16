const express = require('express');
const morgan = require('morgan')


const userRouter = require('./users/users-router'); //*the endpoint routes for /

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
// global middlewares
server.use(morgan('dev'))

//user's router need to be connected here
server.use('/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware boissss!</h2><p>inside [NO] route</p>`);
});

module.exports = server;
