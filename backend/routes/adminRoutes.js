import express from "express";
import {
  getProdById,
  getProducts,
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
} from "../controllers/adminController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get( protect, getProducts);
router
  .route("/:id")
  .get(getProdById)
  .delete(protect, DeleteProduct)
  .put(protect, UpdateProduct);
router.route("/create").post(protect, CreateProduct);

export default router;
