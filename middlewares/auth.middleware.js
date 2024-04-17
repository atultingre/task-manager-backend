import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("token: ", token);

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decodedToken: ", decodedToken);
      const resp = await User.findById(decodedToken.userId).select(
        "isAdmin email"
      );
      console.log("resp: ", resp);

      if (!resp) {
        throw new Error("User not found");
      }

      req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        userId: decodedToken.userId,
      };

      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Not authorized. Try login again." });
    }
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(401)
      .json({ status: false, message: "Not authorized. Try login again." });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login again.",
    });
  }
};

export { isAdminRoute, protectRoute };
