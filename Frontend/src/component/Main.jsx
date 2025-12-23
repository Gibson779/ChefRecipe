export default function Main(){
    const ingredients = ["chicken", "Tomatoes", "Peppers"]

    const ingredientsList = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ))


    return(
        <>
        <main>
         <form className="content">
         <input
           type="text" 
             placeholder="Type something..." 
              className="input-box"       
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


