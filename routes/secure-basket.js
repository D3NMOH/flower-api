import express from "express";
import {
  secureGetBasket,
  secureAddToBasket,
  secureRemoveFromBasket,
} from "../handlers/basket.js";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

router.get("/", ClerkExpressRequireAuth(), secureGetBasket);
router.post("/add", ClerkExpressRequireAuth(), secureAddToBasket);
router.post("/remove", ClerkExpressRequireAuth(), secureRemoveFromBasket);

export default router;
