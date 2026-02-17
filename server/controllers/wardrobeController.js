import WardrobeItem from "../models/WardrobeItem.js";
import { cloudinary } from "../config/cloudinary.js";

// ADD ITEM
export const addItem = async (req, res) => {
  try {
    const { type, color, occasion } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "fitsy",
    });

    const item = await WardrobeItem.create({
      user: req.user._id,
      type,
      color,
      occasion,
      imageUrl: result.secure_url,
    });

    res.status(201).json(item);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Upload failed" });
  }
};


// GET ITEMS
export const getItems = async (req, res) => {
  try {
    const items = await WardrobeItem.find({ user: req.user._id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items" });
  }
};


// DELETE ITEM
export const deleteItem = async (req, res) => {
  try {
    const item = await WardrobeItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await item.deleteOne();

    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};