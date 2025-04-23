import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    email: ""
  });

  const navigate = useNavigate();

  function validate() {
    let valid = true;
    const newErrors = { name: "", contact: "", email: "" };

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name must only contain letters and spaces";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    const phoneRegex = /^(07|01)\d{8}$/;
    if (!phoneRegex.test(formData.contact)) {
      newErrors.contact = "Phone must start with 07 or 01 and have 10 digits";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.contact,
        email: formData.email,
        fee: "0",
        image: "./images/gorg.jpg" // you can remove this if not needed
      })
    })
      .then((res) => res.json())
      .then(() => {
        setFormData({ name: "", contact: "", email: "" });
        navigate("/");
      })
      .catch((err) => console.error("Error submitting form:", err));
  }

  return (
    <>
      <NavBar />
      <form className="studForm" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Joe"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <label>Contact</label>
        <input
          type="text"
          name="contact"
          placeholder="07** *** ****"
          value={formData.contact}
          onChange={handleChange}
        />
        {errors.contact && <p style={{ color: "red" }}>{errors.contact}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="joe@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <br /><br /><br />
        <button type="submit" className="bw-btn">SUBMIT</button>
      </form>
    </>
  );
}

export default Form;
