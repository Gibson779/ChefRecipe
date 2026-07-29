import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make...
`;

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);
console.log(process.env.HF_ACCESS_TOKEN?.slice(0, 5));

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
      max_tokens: 1024,
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