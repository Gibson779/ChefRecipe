export async function getRecipeFromOpenRouter(ingredientsArr) {
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
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to generate recipe");
  }

  const data = await response.json();
  return data.recipe;
}