import jwt from "jsonwebtoken";

const createToken = (res, _id) => {
  const token = jwt.sign({ _id }, "mysecretjwtkey", {
    expiresIn: "3d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV != "development",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000, // time always must be in milliseconds
  });
};

export default createToken;
