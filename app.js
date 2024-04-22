import express from "express";
import cors from "cors";
import products from "./routes/products.js";
import basket from "./routes/basket.js";
import secureBasket from "./routes/secure-basket.js";
import secureFavorites from "./routes/secure-favorites.js";
import favorites from "./routes/favorites.js";
import { resetDb } from "./handlers/admin.js";
import bodyParser from "body-parser";
import { config } from "./util/config.js";

const { PORT } = config;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    msg: "flowers api",
  });
});

app.use("/products", products);
app.use("/basket", basket);
app.use("/secure-basket", secureBasket);
app.use("/favorites", favorites);
app.use("/secure-favorites", secureFavorites);

// admin routes
app.post("/admin/reset-db", resetDb);

const server = app.listen(PORT, () =>
  console.log(`flowers api listening on port ${PORT}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
