//npm
const express = require("express");

//home grown
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");
const Users = require("../users/users-model");
const Posts = require("../posts/posts-model");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router(); //* create the single router. Then below append methods to the router?

//// RETURN AN ARRAY WITH ALL THE USERS
router.get("/", logger, async (req, res) => {
  try {
    const usersArr = await Users.get();
    res.status(200).json(usersArr);
  } catch (err) {
    res.status(400).json({ message: "You are not going to like this..." });
  }
});

//// RETURN THE USER OBJECT
//// this needs a middleware to verify user id
router.get("/:id", logger, validateUserId, (req, res) =>
  res.status(200).json(req.user)
);

//// RETURN THE NEWLY CREATED USER OBJECT
// this needs a middleware to check that the request body is valid
router.post("/", logger, async (req, res, next) => {
  try {
    const newUserObj = await Users.insert(req.body);
    if (newUserObj) {
      res.status(201).json(newUserObj);
    } else {
      res.status(400).json({ message: "uh oh! from .post()" });
    }
  } catch (err) {
    res.status(500).json(err);
    // next(err)
  }
});

//* RETURN THE FRESHLY UPDATED USER OBJECT
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
router.put("/:id", logger, validateUserId, validateUser, async (req, res) => {
  const id = req.user.id; //*comes from user prop on req added in validateUserId
  const changes = req.body; //* req original payload

  const updatedUser = await Users.update(id, changes);
  if (updatedUser) {
    res.status(200).json({ data: changes, message: "new user updated." });
  } else {
    res
      .status(400)
      .json({ message: "unable to update user. Please try again" });
  }
});

// RETURN THE FRESHLY DELETED USER OBJECT
router.delete("/:id", logger, (req, res) => {
  // this needs a middleware to verify user id
});

router.get("/:id/posts", logger, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", logger, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
