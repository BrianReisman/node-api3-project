function logger(req, res, next) {
  // DO YOUR MAGIC
}

function validateUserId(req, res, next) {
  const id = req.params;
  // if(!id){
    // res.status(400).json({message: 'an id is required to hit this endpoint'})
  // }
  console.log(id)

  //* next()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePost };
