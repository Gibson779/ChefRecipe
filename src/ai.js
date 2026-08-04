const SYSTEM_PROMPT = 
`Create a recipe in under 300 words using these ingredients...
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
