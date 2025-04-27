import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    fee: "",
    image: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then(() => {
        setFormData({ name: "", contact: "", email: "", fee: "", image: "" });
        navigate("/");
      })
      .catch((err) => console.error("Error submitting form:", err));
  };

  return (
    <>
      <NavBar />
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <h2 className="form-heading">STUDENT REGISTRATION FORM</h2>
        
        <label className="form-heading">NAME:</label>
        <input
          type="text"
          name="name"
          placeholder="Joe"
          value={formData.name}
          onChange={handleChange}
          className="styled-form input"
        />

        <label className="form-heading">CONTACT:</label>
        <input
          type="text"
          name="contact"
          placeholder="07** *** ****"
          value={formData.contact}
          onChange={handleChange}
          className="styled-form input"
        />

        <label className="form-heading">EMAIL:</label>
        <input
          type="email"
          name="email"
          placeholder="joe@gmail.com"
          value={formData.email}
          onChange={handleChange}
          className="styled-form input"
        />

        <label className="form-heading">FEE PAID:</label>
        <input
          type="number"
          name="fee"
          placeholder="Enter fee paid"
          value={formData.fee}
          onChange={handleChange}
          className="styled-form input"
        />

        <label className="form-heading">IMAGE URL:</label>
        <input
          type="text"
          name="image"
          placeholder="Enter image URL"
          value={formData.image}
          onChange={handleChange}
          className="styled-form input"
        />

        <button type="submit" className="bw-btn">SUBMIT</button>
      </form>
    </>
  );
}

export default Form;
