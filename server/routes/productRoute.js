import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  braintreePaymentController,
  braintreetokencontroller,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productFilterController,
  productListController,
  productPagination,
  productPhotoController,
  productSearchController,
  productcategoryController,
  relatedProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

// create-product route // Method Post
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);


//get allproducts || method GET
router.get("/get-product", getProductController);

//get Single Product method ||post
router.get("/get-product/:slug", getSingleProductController);

//get Photo

router.get("/product-photo/:pid", productPhotoController);

//delete Product
router.delete("/delete-product/:pid", deleteProductController);

//filter Product
router.post("/product-filters", productFilterController);

//Pgination

router.get("/product-pagination", productPagination);

//product per page
router.get("/product-list/:page", productListController);

//Search products 
router.get("/search/:keyword", productSearchController);

//Smilar Product 
router.get("/related-product/:pid/:cid", relatedProductController)

//category wise product
router.get("/product-category/:slug", productcategoryController)

//Pyment Routes
//token
router.get("/braintree/token", braintreetokencontroller)

//payments
router.post("/braintree/payment",requireSignIn, braintreePaymentController)

 



export default router;
