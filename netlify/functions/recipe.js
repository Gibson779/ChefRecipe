
const SYSTEM_PROMPT = `
You are a professional chef.

Create a delicious recipe using the ingredients provided.
Keep the recipe under 300 words.
Format the response in Markdown.

Include:
- Recipe name
- Preparation time
- Cooking time
- Ingredients
- Step-by-step cooking instructions

Only use the provided ingredients where possible.
You may suggest basic seasonings and pantry staples.
`;

export async function handler(event) {
  try {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed." }),
      };
    }

    // Get ingredients from the frontend
    const { ingredients } = JSON.parse(event.body || "{}");

    if (
      !Array.isArray(ingredients) ||
      ingredients.length === 0 ||
      !ingredients.every(item => typeof item === "string" && item.trim())
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Please provide valid ingredients." }),
      };
    }

    // Check that the API key exists
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error("OpenRouter API key is missing.");
    }

    // Ask OpenRouter to generate a recipe
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.URL || "https://netlify.com",
          "X-OpenRouter-Title": "ChefClaude",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `Create a recipe using: ${ingredients.join(", ")}`,
            },
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      }
    );

    const result = await response.json();

    // Log the response to help diagnose deployment issues
    console.log("OpenRouter status:", response.status);
    console.log("OpenRouter response:", JSON.stringify(result));

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: result.error?.message || "OpenRouter request failed.",
        }),
      };
    }

    // Extract the recipe from the response
    const message = result.choices?.[0]?.message;
    const recipe = message?.content;

    if (typeof recipe !== "string" || !recipe.trim()) {
      console.error("Recipe content was empty.", {
        message,
        finishReason: result.choices?.[0]?.finish_reason,
      });

      return {
        statusCode: 502,
        body: JSON.stringify({
          error: "OpenRouter did not return recipe text.",
          finishReason: result.choices?.[0]?.finish_reason || null,
        }),
      };
    }

    // Send the recipe back to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ recipe }),
    };
  } catch (error) {
    console.error("Recipe generation error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
