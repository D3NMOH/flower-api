import { config } from "../util/config.js";
import db from "../util/db.js";

const basketTableName = config.DB_TABLE_NAME_PREFIX + "basket";
const flowersTableName = config.DB_TABLE_NAME_PREFIX + "flowers";

async function _addToBasket({ userId, productId, amount = 1 }) {
  try {
    await db(basketTableName)
      .insert({
        userId,
        productId,
        amount,
      })
      .onConflict(["userId", "productId"])
      .merge({
        amount: db.raw("?? + ?", [`${basketTableName}.amount`, amount]),
      });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function _removeFromBasket({ userId, productId, amount = 1 }) {
  try {
    await db.transaction(async (trx) => {
      await trx(basketTableName)
        .where({ userId, productId })
        .decrement("amount", amount);
      await trx(basketTableName)
        .where({ userId, productId })
        .andWhere("amount", "<", 1)
        .del();
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function _getBasket({ userId }) {
  try {
    const result = await db(basketTableName)
      .select(`${basketTableName}.*`, `${flowersTableName}.*`)
      .leftJoin(
        `${flowersTableName}`,
        `${basketTableName}.productId`,
        `${flowersTableName}.id`
      )
      .where({ userId });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function addToBasket(req, res) {
  const { userId, productId, amount = 1 } = req.body;
  try {
    await _addToBasket({ userId, productId, amount });
    return res.json({ msg: "ok" });
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
}

export async function removeFromBasket(req, res) {
  const { userId, productId, amount = 1 } = req.body;
  try {
    await _removeFromBasket({ userId, productId, amount });
    return res.json({ msg: "ok" });
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
}

export async function getBasket(req, res) {
  const { userId } = req.params;
  try {
    const result = await _getBasket({ userId });
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
}

export async function secureAddToBasket(req, res) {
  const userId = req.auth.claims.sub;
  const { productId, amount = 1 } = req.body;
  try {
    await _addToBasket({ userId, productId, amount });
    return res.json({ msg: "ok" });
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
}

export async function secureRemoveFromBasket(req, res) {
  const userId = req.auth.claims.sub;
  const { productId, amount = 1 } = req.body;
  try {
    await _removeFromBasket({ userId, productId, amount });
    return res.json({ msg: "ok" });
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
}

export async function secureGetBasket(req, res) {
  const userId = req.auth.claims.sub;
  try {
    const result = await _getBasket({ userId });
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ msg: "server error" });
  }
}
