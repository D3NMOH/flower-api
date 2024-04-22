import express from "express";
import {
  getFlowers,
  getBundles,
  getArrangements,
  getBouquets,
} from "../handlers/flowers.js";

const router = express.Router();

router.get("/flowers", getFlowers);
router.get("/bundles", getBundles);
router.get("/arrangements", getArrangements);
router.get("/bouquets", getBouquets);

export default router;
