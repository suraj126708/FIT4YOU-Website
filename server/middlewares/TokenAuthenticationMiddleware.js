import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TokenAuthMiddleware = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.id = decoded._id;
    next();
  });
};

export default TokenAuthMiddleware;
