const User = require("../../database/models/User");

const checkUser = async (req, res, next) => {
  const user = req.body;
  const alreadyUser = await User.findOne(user);
  try {
    if (user.username !== alreadyUser) {
      const newUser = await User.create(user);
      res.status(201);
      res.json(newUser);
      return;
    }
  } catch (error) {
    error.message = "El usuario ya existe";
    next(error);
  }
};

module.exports = { checkUser };
