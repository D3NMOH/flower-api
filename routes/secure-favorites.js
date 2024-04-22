import express from "express";
import {
  secureGetFavorites,
  secureAddFavorite,
  secureRemoveFavorite,
} from "../handlers/favorites.js";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

router.get("/", ClerkExpressRequireAuth(), secureGetFavorites);
router.post("/add", ClerkExpressRequireAuth(), secureAddFavorite);
router.post("/remove", ClerkExpressRequireAuth(), secureRemoveFavorite);

export default router;
