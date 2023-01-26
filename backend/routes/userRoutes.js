import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/users/register").post(registerUser);
router.post("/users/login", authUser);
router.route("/users/profile").post(protect, updateUserProfile);

export default router;
