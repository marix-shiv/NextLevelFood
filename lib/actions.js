"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInavalid(text) {
  return !text || text.trim().length === 0;
}

export async function handleSubmit(prevState,formData) {
  const meal = {
    title: formData.get("title"),
    image: formData.get("image"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInavalid(meal.title) ||
    isInavalid(meal.summary) ||
    isInavalid(meal.instructions) ||
    isInavalid(meal.creator) ||
    isInavalid(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }
  await saveMeal(meal);
  revalidatePath("/meals")
  redirect("/meals");
}
