import Jwt from "jsonwebtoken";
import userModal from "../models/userModal.js";

//Protected Routes on top of Token

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = Jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModal.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorize Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};
