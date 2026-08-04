import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
 Create a recipe in under 300 words using these ingredients...
`;

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);


export async function handler(event) {
  try {
    const { ingredients } = JSON.parse(event.body);

    const ingredientsString = ingredients.join(", ");

    const response = await hf.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe.`,
        },
      ],
      max_tokens: 200,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        recipe: response.choices[0].message.content,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
}