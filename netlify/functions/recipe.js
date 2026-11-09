
const SYSTEM_PROMPT = `
You are a professional chef.

Create a delicious recipe using the ingredients provided.

Keep the recipe under 300 words.

Format your response in Markdown.

Include:
- Recipe name
- Preparation time
- Cooking time
- Ingredients
- Step-by-step cooking instructions

Use clear headings and make the recipe easy to read on a webpage.

Only use ingredients provided where possible.
You may suggest basic seasonings and pantry staples.
`;

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({
          error: "Method not allowed",
        }),
      };
    }

    const { ingredients } = JSON.parse(event.body || "{}");

    if (
      !Array.isArray(ingredients) ||
      ingredients.length === 0 ||
      !ingredients.every(
        item => typeof item === "string" && item.trim()
      )
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Please provide valid ingredients.",
        }),
      };
    }

    const ingredientsString = ingredients
      .map(item => item.trim())
      .join(", ");

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error("OpenRouter API key is missing.");
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:8888",
          "X-OpenRouter-Title": "ChefClaude",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: `I have ${ingredientsString}. Please create a recipe.`,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", result);

      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: result.error?.message || "OpenRouter request failed.",
        }),
      };
    }

    const recipe = result.choices?.[0]?.message?.content;

    if (!recipe) {
      throw new Error("No recipe was returned by OpenRouter.");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        recipe,
      }),
    };

  } catch (err) {
    console.error("Recipe generation error:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
}
