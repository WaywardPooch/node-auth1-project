const User = require("./../users/users-model");

/*
  If the user does not have a session saved in the server

  status 401
  { "message": "You shall not pass!" }
*/
const restricted = (req, res, next) => {
  if (!req.session.user) {
    next({
      status: 401,
      message: "You shall not pass!"
    });
  } else {
    next();
  }
};

/*
  If the username in req.body already exists in the database

  status 422
  { "message": "Username taken" }
*/
const checkUsernameFree = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findBy({ username: username });
  if (user) {
    next({
      status: 422,
      message: "Username taken"
    });
  } else {
    next();
  }
};

/*
  If the username in req.body does NOT exist in the database

  status 401
  { "message": "Invalid credentials" }
*/
const checkUsernameExists = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findBy({ username });
  if (!user) {
    next({
      status: 401,
      message: "Invalid credentials"
    });
  } else {
    next();
  }
};

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  { "message": "Password must be longer than 3 chars" }
*/
const checkPasswordLength = (req, res, next) => {
  const { password } = req.body;
  if (
    password === undefined ||
    password.length <= 3
  ) {
    next({
      status: 422,
      message: "Password must be longer than 3 chars"
    });
  } else {
    next();
  }
};

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
};
