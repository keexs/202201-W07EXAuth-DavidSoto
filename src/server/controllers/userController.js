const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");

const registerUser = async (req, res, next) => {
  const user = req.body;
  const alreadyUser = await User.findOne(user);

  try {
    if (alreadyUser === null) {
      const newUser = await User.create(user);
      res.status(201);
      res.json(newUser);
      return;
    }
    const error = new Error("El usuario ya existe");
    error.code = 401;
    next(error);
  } catch (error) {
    error.code = 401;
    error.message = "El usuario ya existe";
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    const error = new Error("User not found");
    error.code = 401;
    next(error);
  } else {
    const userData = {
      name: user.name,
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
    };
    const token = jwt.sign(userData, process.env.JWT_SECRET);
    res.json({ token });
  }
};

module.exports = { registerUser, loginUser };
