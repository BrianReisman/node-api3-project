const userModel = require("../users/users-model");

function logger(req, res, next) {
  console.log(
    `Method: ${req.method}. Url: ${
      req.url
    }. Request time: ${new Date().toISOString()}`
  );

  next();
}

const validateUserId = async (req, res, next) => {
  const { id } = req.params; //*destructure
  try {
    const user = await userModel.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "id not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "error processing request", error: err }); //!error handling here?
  }
};

function validateUser(req, res, next) {
  const userName = req.body.name;
  if (typeof userName == "string" && userName.length > 0) {
    next();
  } else {
    res
      .status(400)
      .json({
        message:
          "invalid name property. Must be a string and at least 1 character long",
      });
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };
