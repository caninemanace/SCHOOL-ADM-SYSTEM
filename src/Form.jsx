import NavBar from "./NavBar";

function Form(){
    return(
        <>
            <NavBar/>

            <form class="studForm" method=" POST"action="#">
                <label>Name</label>
                <input type="text" name="name" placeholder="Joe"></input>

                <label>Contact</label>
                <input type="number" name="contact" placeholder="07** *** ****"></input>

                <label>Email</label>
                <input type="email" name="email" placeholder="joe@gmail.com"></input>

                <label>Image</label>
                <input type="text" name="image" placeholder="./joe.jpg"></input>

            </form>

        </>
        

    )
}
export default Form;