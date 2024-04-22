import { config } from "../util/config.js";
import db from "../util/db.js";

const favoritesTableName = config.DB_TABLE_NAME_PREFIX + "favorites";
const flowersTableName = config.DB_TABLE_NAME_PREFIX + "flowers";

async function _addFavorite({ userId, productId }) {
  try {
    await db(favoritesTableName).insert({
      userId,
      productId,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function _removeFavorite({ userId, productId }) {
  try {
    await db(favoritesTableName).where({ userId, productId }).del();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function _getFavorites({ userId }) {
  try {
    const result = await db(favoritesTableName)
      .select(`${favoritesTableName}.*`, `${flowersTableName}.*`)
      .leftJoin(
        `${flowersTableName}`,
        `${favoritesTableName}.productId`,
        `${flowersTableName}.id`
      )
      .where({ userId });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function addFavorite(req, res) {
  const { userId, productId } = req.body;
  try {
    await _addFavorite({ userId, productId });
    return res.json({ msg: "ok" });
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
}

export async function removeFavorite(req, res) {
  const { userId, productId } = req.body;
  try {
    await _removeFavorite({ userId, productId });
    return res.json({ msg: "ok" });
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
}

export async function getFavorites(req, res) {
  const { userId } = req.params;
  try {
    const result = await _getFavorites({ userId });
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
}

export async function secureAddFavorite(req, res) {
  const userId = req.auth.claims.sub;
  const { productId } = req.body;
  try {
    await _addFavorite({ userId, productId });
    return res.json({ msg: "ok" });
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
}

export async function secureRemoveFavorite(req, res) {
  const userId = req.auth.claims.sub;
  const { productId } = req.body;
  try {
    await _removeFavorite({ userId, productId });
    return res.json({ msg: "ok" });
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
}

export async function secureGetFavorites(req, res) {
  const userId = req.auth.claims.sub;
  try {
    const result = await _getFavorites({ userId });
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
}
