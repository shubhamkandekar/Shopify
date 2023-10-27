import { comparPassword, hashPassword } from "../helpers/authHelper.js";
import userModal from "../models/userModal.js";
import jwt from "jsonwebtoken";
import orderModal from "../models/orderModal.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // validating the fields
    if (!name) {
      return res.send({ message: "Name is require" });
    }
    if (!email) {
      return res.send({ message: "Email is require" });
    }
    if (!password) {
      return res.send({ message: "Password is require" });
    }
    if (!phone) {
      return res.send({ message: "Contact is require" });
    }
    if (!address) {
      return res.send({ message: "Address is require" });
    }
    if (!answer) {
      return res.send({ message: "Answer is require" });
    }
    // check for existing user
    const existingUser = await userModal.findOne({ email });

    // existing user
    if (existingUser) {
      return res.status(409).send({
        success: false,
        error: "User already registered. Please login.",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModal({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: "An error occurred",
      message: error.message,
    });
  }
};

//login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email & Password",
      });
    }
    //checking users
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const match = await comparPassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generating token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgot password controller

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModal.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModal.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// test Controller
export const testController = (req, res) => {
  res.send("protected route");
};

// update controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModal.findById(req.user._id);
    //password validation
    if (password && password.length < 6) {
      return res.json({ error: "Password is require and 6 Charecter Long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModal.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "UserUpdated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to Update the profile",
      error,
    });
  }
};

//order controller
export const orderscontroller = async (req, res) => {
  try {
    const orders = await orderModal
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to fetch Orders",
      error,
    });
  }
};

// get all orders for admin

export const allorderscontroller = async (req, res) => {
  try {
    const orders = await orderModal
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable To Get All Orders",
      error,
    });
  }
};

//orders status controller
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModal.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to update status",
      error,
    });
  }
};
