import chefLogo from "/chefsHat.jpg"

export default function Header(){
    return(
      <header>
        <div className="image">
            <img src={chefLogo} />
            </div>
            <h1>Make a Recipe</h1>
            
     </header>
        
    )
}

