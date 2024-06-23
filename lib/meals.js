import sql from "better-sqlite3";
import fs from "node:fs";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // throw new Error('Something went wrong')
  const data = db.prepare("SELECT * FROM meals").all();
  // console.log(data);
  return data;
}

export async function getMeal(slug) {
  // await new Promise(resolve => setTimeout(resolve, 1000));
  const data = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
  return data;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`./public/images/${filename}`);
  const bufferImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferImage), (error) => {
    if (error) {
      throw new Error("Error saving file");
    }
  });
  meal.image = `/images/${filename}`;
  db.prepare(`
        INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
        VALUES(
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
        `).run(meal);
}
