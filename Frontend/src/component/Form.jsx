export default function Form(){
    return(
        <section>
            <h1>Sign Up Form</h1>
            <form> 
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder="Joe@schmoe"/>
                <br />

                <label htmlFor="password">Password:</label>
                <input type="password" name="password" />
                



            </form>
        </section>

    )
}