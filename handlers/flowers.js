import { config } from "../util/config.js";
import db from "../util/db.js";

async function findFlowers(type, category) {
  const flowersTableName = config.DB_TABLE_NAME_PREFIX + "flowers";
  try {
    const flowers = await db(flowersTableName).where({
      type,
      ...(category && { category }),
    });
    return flowers;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "server error" });
  }
}

export async function getFlowers(req, res) {
  try {
    const flowers = await findFlowers("flower");
    return res.json(flowers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "server error" });
  }
}

export async function getBouquets(req, res) {
  const { category } = req.query;
  try {
    const flowers = await findFlowers("bouquet", category);
    return res.json(flowers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "server error" });
  }
}

export async function getArrangements(req, res) {
  try {
    const flowers = await findFlowers("arrangement");
    return res.json(flowers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "server error" });
  }
}

export async function getBundles(req, res) {
  try {
    const flowers = await findFlowers("bundle");
    return res.json(flowers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "server error" });
  }
}
