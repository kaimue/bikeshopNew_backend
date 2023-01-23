import express from "express";
import imageUploader from "../middlewares/imageUploader.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  postProduct,
  getRandomProducts,
  getProducts,
  searchProducts,
  getProductById,
  getProductsByCategorie,
} from "../controllers/products.js";
import paginated from "../middlewares/pagination.js";
import productModel from "../models/product.js";

const router = express.Router();

router
  .route("/")
  .get(paginated(productModel), getProducts)
  .post(imageUploader.single("image"), postProduct);

router.route("/single/:id").get(getProductById);

router.route("/categorie/:categorie").get(getProductsByCategorie);

router.route("/randomProducts").get(getRandomProducts);

router.route("/search").get(searchProducts);

export default router;
