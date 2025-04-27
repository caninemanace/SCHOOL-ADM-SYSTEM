import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    fee: "",
    image: "",
    course: "" // Add course field
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
        setFormData({ name: "", contact: "", email: "", fee: "", image: "", course: "" });
        navigate("/");
      })
      .catch((err) => console.error("Error submitting form:", err));
  };

  return (
    <>
      <NavBar />
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <h2 className="form-heading">HAMPTON UNIVERSITY REGISTRATION FORM</h2> <hr /><hr />
        
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

        <label className="form-heading">COURSE:</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="styled-form input"
        >
          <option value="">Select a course</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Business Administration">Business Administration</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Medicine">Medicine</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Data Science">Data Science</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Law">Law</option>
          <option value="Psychology">Psychology</option>
          <option value="Economics">Economics</option>
          <option value="Architecture">Architecture</option>
          <option value="Nursing">Nursing</option>
          <option value="Pharmacy">Pharmacy</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Environmental Science">Environmental Science</option>
          <option value="Journalism and Mass Communication">Journalism and Mass Communication</option>
        </select>

        <button type="submit" className="bw-btn">SUBMIT</button>
      </form>
    </>
  );
}

export default Form;
