import express from "express";
import {
  allorderscontroller,
  forgotPasswordController,
  loginController,
  orderStatusController,
  orderscontroller,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
// router object
const router = express.Router();

//routing
//REgister ||method post
router.post("/register", registerController);

//Login || method POST
router.post("/login", loginController);

//Forgot password || method POST
router.post("/forgot-password", forgotPasswordController)


router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth for user || method GET
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Proted route for admin || method GET
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update Profile route
router.put("/profile", requireSignIn, updateProfileController )

//orders
router.get("/orders", requireSignIn, orderscontroller)

//Get All Orders For Admin
router.get("/all-orders", requireSignIn,isAdmin, allorderscontroller)

//order status update
router.put("/order-status/:orderId", requireSignIn,isAdmin, orderStatusController)

export default router;
