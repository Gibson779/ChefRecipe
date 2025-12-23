export default function Main(){
    const ingredients = ["chicken", "Tomatoes", "Peppers"]

    const ingredientsList = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ))

  function handleSubmit(event){
    event.preventDefualt()
    console.log("Form submitted")
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
        <button>Add ingredient</button>
    
        </form>

        <ul>
            {ingredientsList}

        </ul>
        </main>
        </>
        
    )
} 


