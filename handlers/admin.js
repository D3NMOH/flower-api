import { config } from "../util/config.js";
import db from "../util/db.js";
const { DB_TABLE_NAME_PREFIX } = config;

export async function resetDb(req, res) {
  const flowersTableName = DB_TABLE_NAME_PREFIX + "flowers";
  const basketTableName = DB_TABLE_NAME_PREFIX + "basket";
  const favoritesTableName = DB_TABLE_NAME_PREFIX + "favorites";

  try {
    await db.schema.dropTableIfExists(basketTableName);
    await db.schema.dropTableIfExists(favoritesTableName);
    await db.schema.dropTableIfExists(flowersTableName);
    await db.schema.createTable(flowersTableName, (table) => {
      table.increments("id").primary();
      table.string("name");
      table.integer("price");
      table.string("img");
      table.string("category");
      table.string("type");
    });
    await db.schema.createTable(basketTableName, (table) => {
      table.string("userId");
      table.integer("productId").references(`${flowersTableName}.id`);
      table.integer("amount");
      table.primary(["userId", "productId"]);
    });
    await db.schema.createTable(favoritesTableName, (table) => {
      table.string("userId");
      table.integer("productId").references(`${flowersTableName}.id`);
      table.primary(["userId", "productId"]);
    });

    await db(flowersTableName).insert([
      {
        name: "Rose",
        price: 100,
        img: "/assets/rose.jpeg",
        type: "flower",
      },

      {
        name: "Tulip",
        price: 60,
        img: "/assets/tulip.jpeg",
        type: "flower",
      },
      {
        name: "Daisy",
        price: 50,
        img: "/assets/daisy.jpeg",
        type: "flower",
      },
      {
        name: "Orchid",
        price: 90,
        img: "/assets/orchid.jpeg",
        type: "flower",
      },
      {
        name: "Sunflower",
        price: 30,
        img: "/assets/sunflower.webp",
        type: "flower",
      },
      {
        name: "Lily",
        price: 70,
        img: "/assets/lily.jpeg",
        type: "flower",
      },
      {
        name: "Peony",
        price: 80,
        img: "/assets/peony.webp",
        type: "flower",
      },
      {
        name: "Chrysanthemum",
        price: 40,
        img: "/assets/chrysanthemum.jpeg",
        type: "flower",
      },
      {
        name: "Iris",
        price: 55,
        img: "/assets/iris.jpeg",
        type: "flower",
      },
      {
        name: "Hyacinth",
        price: 65,
        img: "/assets/hyacinth.jpeg",
        type: "flower",
      },
      {
        name: "Carnation",
        price: 20,
        img: "/assets/carnation.jpeg",
        type: "flower",
      },
      {
        name: "Freesia",
        price: 75,
        img: "/assets/freesia.jpeg",
        type: "flower",
      },
      {
        name: "Gardenia",
        price: 85,
        img: "/assets/gardenia.jpeg",
        type: "flower",
      },
      {
        name: "Gladiolus",
        price: 45,
        img: "/assets/gladiolus.jpeg",
        type: "flower",
      },
      {
        name: "Magnolia",
        price: 95,
        img: "/assets/magnolia.webp",
        type: "flower",
      },
      {
        name: "Marigold",
        price: 25,
        img: "/assets/marigold.webp",
        type: "flower",
      },
      {
        name: "Poppy",
        price: 35,
        img: "/assets/poppy.jpeg",
        type: "flower",
      },
      {
        name: "Ranunculus",
        price: 65,
        img: "/assets/ranunculus.jpeg",
        type: "flower",
      },
      {
        name: "Snapdragon",
        price: 55,
        img: "/assets/snapdragon.jpeg",
        type: "flower",
      },
      {
        name: "Violet",
        price: 15,
        img: "/assets/violet.webp",
        type: "flower",
      },
      {
        name: "Zinnia",
        price: 40,
        img: "/assets/zinnia.webp",
        type: "flower",
      },
      {
        name: "Roses",
        price: 20,
        img: "/assets/bouquet.jpeg",
        category: "wedding",
        type: "bouquet",
      },
      {
        name: "Roses and Lilies",
        price: 25,
        img: "/assets/bouquet.jpeg",
        category: "wedding",
        type: "bouquet",
      },
      {
        name: "Tulips and Daisies",
        price: 30,
        img: "/assets/bouquet.jpeg",
        category: "birthday",
        type: "bouquet",
      },
      {
        name: "Orchids and Sunflowers",
        price: 35,
        img: "/assets/bouquet.jpeg",
        category: "funeral",
        type: "bouquet",
      },
      {
        name: "Lilies and Peonies",
        price: 40,
        img: "/assets/bouquet.jpeg",
        category: "birthday",
        type: "bouquet",
      },
      {
        name: "Chrysanthemums and Irises",
        price: 45,
        img: "/assets/bouquet.jpeg",
        category: "wedding",
        type: "bouquet",
      },
      {
        name: "Hyacinths and Carnations",
        price: 50,
        img: "/assets/bouquet.jpeg",
        category: "wedding",
        type: "bouquet",
      },
      {
        name: "Freesias and Gardenias",
        price: 55,
        img: "/assets/bouquet.jpeg",
        category: "birthday",
        type: "bouquet",
      },
      {
        name: "Gladiolus and Magnolias",
        price: 60,
        img: "/assets/bouquet.jpeg",
        category: "wedding",
        type: "bouquet",
      },
      {
        name: "Marigolds and Poppies",
        price: 65,
        img: "/assets/bouquet.jpeg",
        category: "funeral",
        type: "bouquet",
      },
      {
        name: "Ranunculus and Snapdragons",
        price: 70,
        img: "/assets/bouquet.jpeg",
        category: "wedding",
        type: "bouquet",
      },
      {
        name: "Violets and Zinnias",
        price: 75,
        img: "/assets/bouquet.jpeg",
        category: "birthday",
        type: "bouquet",
      },
      {
        name: "Mixed Spring Flowers",
        price: 80,
        img: "/assets/bouquet.jpeg",
        category: "birthday",
        type: "bouquet",
      },
      {
        name: "Summer Bloom Collection",
        price: 85,
        img: "/assets/bouquet.jpeg",
        category: "wedding",
        type: "bouquet",
      },
      {
        name: "Autumn Hues Bouquet",
        price: 90,
        img: "/assets/bouquet.jpeg",
        category: "birthday",
        type: "bouquet",
      },
      {
        name: "Winter Wonderland Arrangement",
        price: 95,
        img: "/assets/bouquet.jpeg",
        category: "funeral",
        type: "bouquet",
      },
      {
        name: "Tropical Paradise",
        price: 100,
        img: "/assets/bouquet.jpeg",
        category: "funeral",
        type: "bouquet",
      },
      {
        name: "Exotic Flora Mix",
        price: 105,
        img: "/assets/bouquet.jpeg",
        category: "funeral",
        type: "bouquet",
      },
      {
        name: "Romantic Roses and Orchids",
        price: 110,
        img: "/assets/bouquet.jpeg",
        category: "wedding",
        type: "bouquet",
      },
      {
        name: "Elegant Lilies and Freesias",
        price: 115,
        img: "/assets/bouquet.jpeg",
        category: "birthday",
        type: "bouquet",
      },
      {
        name: "Basic basket bundle",
        price: 50,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Roses and Tulips",
        price: 80,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Daisies and Orchids",
        price: 140,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Sunflowers and Lilies",
        price: 100,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Peonies and Chrysanthemums",
        price: 120,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Irises and Hyacinths",
        price: 120,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Carnations and Freesias",
        price: 130,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Gardenias and Gladiolus",
        price: 130,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Magnolias and Marigolds",
        price: 120,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Poppies and Ranunculus",
        price: 100,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Snapdragons and Violets",
        price: 70,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Zinnias and Roses",
        price: 125,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Tulips and Daisies Mix",
        price: 110,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Orchids and Sunflowers Delight",
        price: 120,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Lilies and Peonies Elegance",
        price: 150,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Chrysanthemums and Irises Charm",
        price: 95,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Hyacinths and Carnations Beauty",
        price: 115,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Freesias and Gardenias Bliss",
        price: 140,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Gladiolus and Magnolias Grace",
        price: 155,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Marigolds and Poppies Joy",
        price: 90,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Ranunculus and Snapdragons Fantasy",
        price: 135,
        img: "/assets/bundle.webp",
        type: "bundle",
      },
      {
        name: "Pastel flowers",
        price: 50,
        img: "/assets/arr/1.jpeg",
        type: "arrangement",
      },
      {
        name: "Classic flowers",
        price: 50,
        img: "/assets/arr/2.jpeg",
        type: "arrangement",
      },
      {
        name: "Colorful flowers",
        price: 50,
        img: "/assets/arr/3.jpeg",
        type: "arrangement",
      },
      {
        name: "Pink and white flowers",
        price: 50,
        img: "/assets/arr/4.jpeg",
        type: "arrangement",
      },
      {
        name: "Lilac flowers",
        price: 50,
        img: "/assets/arr/5.jpeg",
        type: "arrangement",
      },
      {
        name: "Pink and white flowers",
        price: 50,
        img: "/assets/arr/6.jpeg",
        type: "arrangement",
      },
      {
        name: "Lilac and white flowers",
        price: 50,
        img: "/assets/arr/7.jpeg",
        type: "arrangement",
      },
      {
        name: "Pink and white flowers",
        price: 50,
        img: "/assets/arr/8.jpeg",
        type: "arrangement",
      },
      {
        name: "Lilac and white flowers",
        price: 50,
        img: "/assets/arr/9.jpeg",
        type: "arrangement",
      },
      {
        name: "Rose and white flowers",
        price: 50,
        img: "/assets/arr/1.jpeg",
        type: "arrangement",
      },
      {
        name: "Classic flowers",
        price: 50,
        img: "/assets/arr/2.jpeg",
        type: "arrangement",
      },
      {
        name: "Colorful flowers",
        price: 50,
        img: "/assets/arr/3.jpeg",
        type: "arrangement",
      },
      {
        name: "Pink and white flowers",
        price: 50,
        img: "/assets/arr/4.jpeg",
        type: "arrangement",
      },
      {
        name: "Lilac and white flowers",
        price: 50,
        img: "/assets/arr/5.jpeg",
        type: "arrangement",
      },
      {
        name: "Pink and white flowers",
        price: 50,
        img: "/assets/arr/6.jpeg",
        type: "arrangement",
      },
      {
        name: "Lilac and white flowers",
        price: 50,
        img: "/assets/arr/7.jpeg",
        type: "arrangement",
      },
      {
        name: "Pink and white flowers",
        price: 50,
        img: "/assets/arr/8.jpeg",
        type: "arrangement",
      },
      {
        name: "Lilac and white flowers",
        price: 50,
        img: "/assets/arr/9.jpeg",
        type: "arrangement",
      },
    ]);

    return res.json({
      msg: "db reset successful",
    });
  } catch (err) {
    console.error(err);
    res.json({
      msg: "db reset failed",
    });
  }
}
