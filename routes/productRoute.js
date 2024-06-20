import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// create prod routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController,
  
);

// get products
router.get('/get-product', getProductController);


//get single products
router.get('/get-product/:slug', getSingleProductController);


//get photo
router.get('/product-photo/:pid', productPhotoController);


///delete product
router.delete('/delete-product/:pid', deleteProductController);


///update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

export default router;
