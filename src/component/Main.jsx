import React from "react"
import IngredientsList from "../component/IngredientsList";
import ClaudeRecipe from "../component/ClaudeRecipe";
import { getRecipeFromOpenRouter } from "../ai"

export default function Main() {

    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    
     
   async function getRecipe() {
    const generatedRecipe = await getRecipeFromOpenRouter(ingredients)
    setRecipe(generatedRecipe)
    
}
     
    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

             {ingredients.length > 0 && 
             <IngredientsList 
             ingredients={ingredients} 
              getRecipe={getRecipe}
              />
              }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}