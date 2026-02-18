export default function Form(){


    function handleSubmit(event) {
    event.preventDefault()
    const formEl = event.currentTarget
    const formData = new FormData(formEl)
    const email = formData.get("email")
    // Gather the info from the form
    // Submit it to a backend
    formEl.reset()
  }
    return(
        <section>
            <h1>Sign Up Form</h1>
            <form className="form" onSubmit={handleSubmit} method="post">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder="Joe@schmoe"/>
                <br />

                <label htmlFor="password">Password:</label>
                <input type="password" name="password" />

                <br />

                <button className="form">Submit</button>
                



            </form>
        </section>

    )
}