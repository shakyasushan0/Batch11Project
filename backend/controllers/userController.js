import User from "../models/users.js";
import createToken from "../utils/generateToken.js";

const signup = async (req, res) => {
  const { fullname, email, password, isAdmin } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({ error: "User already exists!" });
  }
  const newUser = await User.create({
    fullname,
    email,
    password,
    isAdmin,
  });
  res.send({
    message: "User created",
    user: {
      fullname: newUser.fullname,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send({ error: "User not found!" });

  if (await user.matchPassword(password)) {
    createToken(res, user._id);
    res.send({
      message: "Login Success!",
      user: {
        fullname: user.fullname,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(400).send({ error: "Invalid password!" });
  }
};

const logout = async (req, res) => {
  if (req.user) {
    res.clearCookie("jwt");
    res.send({ message: "Logout success!" });
  } else {
    res.status(400).send({ error: "You are not loggedin!" });
  }
};

const getUserProfile = async (req, res) => {
  res.send(req.user);
};

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).send({ error: "User not found" });

  user.fullname = req.body.fullname || user.fullname;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();
  res.send({
    message: "Profile Updated!",
    user: {
      fullname: updatedUser.fullname,
      email: updatedUser.email,
    },
  });
};

export { signup, login, logout, getUserProfile, updateProfile };
