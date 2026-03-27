import jwt from "jsonwebtoken";
import HttpError from "./HttpError.js";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new HttpError("Authentication required", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new HttpError("Invalid or expired token", 401));
  }
};

export default auth;
