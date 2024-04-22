import express from "express";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../handlers/favorites.js";

const router = express.Router();

router.get("/:userId", getFavorites);
router.post("/add", addFavorite);
router.post("/remove", removeFavorite);

export default router;
