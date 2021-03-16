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
      res.status(404).json({ message: `user with the id: '${id}' not found` });
    }
  } catch (err) {
    res.status(500).json({ message: "error processing request", error: err }); //!error handling here?
  }
};

function validateUser(req, res, next) {
  const userName = req.body.name;
  console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing user data" });
  }
  if (typeof userName == "string" && userName.length > 0) {
    next();
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
}

function validatePost(req, res, next) {
  if (Object.keys(req.body).length <= 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required 'text' property on the request body",
    });
  } else if (!req.body.user_id) {
    res.status(400).json({
      message: "missing required 'user_id' property on the request body",
    });
  } else {
    next();
  }
}

module.exports = { logger, validateUserId, validateUser, validatePost };
