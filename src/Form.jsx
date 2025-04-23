import { useState } from "react";
import NavBar from "./NavBar";

function Form({onAddApplicants}){
    const [formData, setFormData] =useState({
        name:"",
        contact:"",
        email:""
       
    });
    function handleChange(e){
        const{ name,value} = e.target ;
        setFormData((prev)=> ({
            ...prev,
            [name] : value,
            
        }));
    }
    function handleSubmit(e){
        e.preventDefault();
        onAddApplicants(formData);
        setFormData(
            {
                name:"",
                contact:"",
                email:""
            }
        )




    }




    return(
        <>
            <NavBar/>

            <form class="studForm" method=" POST"action="#" onSubmit={handleSubmit} >
                <label>Name</label>
                <input 
                type="text" 
                name="name" 
                placeholder="Joe"
                value={formData.name}
                onChange={handleChange}
                />

                <label>Contact</label>
                <input type="number"
                 name="contact" 
                 placeholder="07** *** ****"
                 value={formData.contact}
                 onChange={handleChange}

                 />

                <label>Email</label>
                <input type="email" 
                name="email" 
                placeholder="joe@gmail.com"
                value={formData.email}
                onChange={handleChange}
                /><br /><br /><br />

                <button type="submit" className="bw-btn">SUBMIT</button>

            </form>

        </>
        

    )
}
export default Form;