import {useState} from "react"


export default function Main(){
    const [ingredients, setIngredients] = useState([])

    const ingredientsList = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ))
 


  function handleSubmit(event){
    event.preventDefault()
    console.log("Form submitted!")
     const formData = new FormData(event.currentTarget)
     const newIngredient = formData.get("ingredient")
     console.log(newIngredient)


     // Add ingredient to state
    setIngredients(prevIngredients => [
      ...prevIngredients,
      newIngredient
    ])

    // Log the newly added ingredient
    console.log(newIngredient)

    // Optional: clear the form
    event.currentTarget.reset()
    
  }
    
    return(
        <>
        <main>
         <form onSubmit= {handleSubmit} className="content">
         <input
           type="text" 
             placeholder="Type something..."       
              aria-label="Add ingredient"
               name="ingredient"

        />
        <button>
          
          Add ingredient
          
          </button>
    
        </form>

        <ul>
            {ingredientsList}

        </ul>
        </main>
        </>
        
    )


  }
