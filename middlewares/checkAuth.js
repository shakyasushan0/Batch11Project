import jwt from "jsonwebtoken";
import User from "../models/users.js";

const checkAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send({ error: "You need to login first!" });
  }
  try {
    const { _id } = jwt.verify(token, "mysecretjwtkey");
    const user = await User.findById(_id);
    req.user = {
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
    };
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
  next();
};

export default checkAuth;
