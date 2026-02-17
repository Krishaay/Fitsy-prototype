import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  addItem,
  getItems,
  deleteItem,
} from "../controllers/wardrobeController.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), addItem);
router.get("/", protect, getItems);
router.delete("/:id", protect, deleteItem);

export default router;