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

// RETURN AN ARRAY WITH ALL THE USERS
router.get("/", async (req, res) => {
  try {
    const usersArr = await Users.get();
    res.status(200).json(usersArr);
  } catch (err) {
    res.status(400).json({ message: "You are not going to like this..." });
  }
});

// RETURN THE USER OBJECT
// this needs a middleware to verify user id
router.get("/:id", validateUserId, async (req, res) => {
  console.log(req.params.id);
  try {
    const singleUser = await Users.getById(req.params.id);
    if (singleUser) {
      res.status(200).json(singleUser);
    } else {
      res.status(400).json({
        message: `You are not going to like this... We have no records of a user with the id of ${req.params.id}`,
      });
    }
  } catch (err) {}
});

router.post("/", (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put("/:id", (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
