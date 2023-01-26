import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "randomString", {
    expiresIn: "30d",
  });
};

export default generateToken;
