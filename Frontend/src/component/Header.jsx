import chefClaudeLogo from "/chefsHat.jpg"

export default function Header(){
    return(
      <header>
        <div className="image">
            <img src={chefClaudeLogo} />
            </div>
            <h1>Shopping List</h1>
            
     </header>
        
    )
}