import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = 
`You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
You don't need to use every ingredient they mention in your recipe. 
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
Format your response in markdown to make it easier to render to a web page`


export async function getRecipeFromMistral(ingredientsArr) {
   const response = await fetch("/.netlify/functions/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredientsArr,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate recipe");
  }

  const data = await response.json();
  return data.recipe;
}
