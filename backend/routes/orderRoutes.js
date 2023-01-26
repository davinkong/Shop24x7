import express from "express";
import {
  getOrderById,
  getOrders,
  CreateOrder,
  DeleteOrder,
  UpdateOrder,
} from "../controllers/orderController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get( protect, getOrders);
router
  .route("/:id")
  .get(getOrderById)
  .delete(protect, DeleteOrder)
  .put( UpdateOrder);
router.route("/create").post(protect, CreateOrder);

export default router;
