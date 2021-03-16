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
//// this needs a middleware to check that the request body is valid
router.post("/", logger, validateUser, async (req, res) => {
  try {
    const newUserObj = await Users.insert(req.body);
    if (newUserObj) {
      res.status(201).json(newUserObj);
    } else {
      res.status(400).json({ message: "uh oh! from .post()" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); // next(err)
  }
});

//* RETURN THE FRESHLY UPDATED USER OBJECT
//// this needs a middleware to verify user id
//// and another middleware to check that the request body is valid
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

//// this needs a middleware to verify user id
router.delete("/:id", logger, validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  console.log(req.user);
  try {
    const removedUser = await Users.remove(req.params.id);
    if (removedUser) {
      res.status(200).json({
        message: `user: with id ${req.params.id} has been removed successfully.`,
        deletedUser: req.user,
      });
    } else {
      res.status(400).json({ message: "error removing user" });
    }
  } catch (err) {
    res.status(500).json({ message: "server side error." });
  }
});

//// this needs a middleware to verify user id
router.get("/:id/posts", logger, validateUserId, async (req, res) => {
  console.log("inside of {get}", req.params.id);
  try {
    // RETURN THE ARRAY OF USER POSTS
    const userPosts = await Posts.get();
    if (userPosts) {
      res.status(200).json(userPosts);
    } else {
      res.status(400).json({ message: "no posts for this user found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//// this needs a middleware to verify user id
//// and another middleware to check that the request body is valid
router.post(
  "/:id/posts",
  logger,
  validateUserId,
  validatePost,
  async (req, res) => {
    try {
      const newPost = await Posts.insert(req.body);
      if (newPost) {
        res.status(201).json(req.body);
      } else {
        console.log("error");
        res.status(400).json({ message: "error" });
      }
    } catch (err) {
      console.log("error! from within [POST] /:id/posts");
      res.status(400).json({ message: "error" });
    }
  }
);

module.exports = router;
