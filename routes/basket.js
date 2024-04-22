import express from "express";
import {
  addToBasket,
  getBasket,
  removeFromBasket,
} from "../handlers/basket.js";

const router = express.Router();

router.get("/:userId", getBasket);
router.post("/add", addToBasket);
router.post("/remove", removeFromBasket);

export default router;
