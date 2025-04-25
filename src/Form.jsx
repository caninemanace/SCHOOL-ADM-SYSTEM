import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    course: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    email: "",
    course: ""
  });

  const navigate = useNavigate();

  function validate() {
    let valid = true;
    const newErrors = { name: "", contact: "", email: "", course: "" };

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

    if (formData.course.trim() === "") {
      newErrors.course = "Course field cannot be empty";
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
        course: formData.course,
        fee: "0",
        image: "./images/gorg.jpg"
      })
    })
      .then((res) => res.json())
      .then(() => {
        setFormData({ name: "", contact: "", email: "", course: "" });
        navigate("/");
      })
      .catch((err) => console.error("Error submitting form:", err));
  }

  const courseOptions = [
    "(MEng) Aerospace Engineering",
    "(MEng) Mechanical Engineering",
    "(MEng) Civil Engineering",
    "(MEng) Electrical Engineering",
    "(BEng) Engineering (Undergraduate)",
    "(BSc) Computer Science",
    "(BSc) Data Science",
    "(BSc) Information Technology",
    "(BA) Political Science",
    "(BA) Journalism",
    "(LLB) Law",
    "(BBA) Business Administration",
    "(BArch) Architecture",
    "(MBBS) Medicine",
    "(BNurs) Nursing",
    "(BFin) Finance",
  ];

  return (
    <>
      <NavBar />
      <form
        className="form-wrapper"
        onSubmit={handleSubmit}
        style={{
          padding: "20px",
          borderRadius: "10px",
          backgroundImage: "url('https://www.e-architect.com/wp-content/uploads/2017/04/oastler-building-university-of-huddersfield-h280417-3.jpg')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white"
        }}
      >
        <h2 className="form-heading">HAMPTON UNIVERSITY STUDENT APPLICATION FORM</h2>

        <label className="form-heading">NAME:</label>
        <input
          type="text"
          name="name"
          placeholder="Joe"
          value={formData.name}
          onChange={handleChange}
          className="styled-form input"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <label className="form-heading">CONTACT:</label>
        <input
          type="text"
          name="contact"
          placeholder="07** *** ***"
          value={formData.contact}
          onChange={handleChange}
          className="styled-form input"
        />
        {errors.contact && <p style={{ color: "red" }}>{errors.contact}</p>}

        <label className="form-heading">EMAIL:</label>
        <input
          type="email"
          name="email"
          placeholder="joe@gmail.com"
          value={formData.email}
          onChange={handleChange}
          className="styled-form input"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <label className="form-heading">COURSE:</label>
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="styled-form input"
        >
          <option value="">Select a course</option>
          {courseOptions.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
        {errors.course && <p style={{ color: "red" }}>{errors.course}</p>}

        <br /><br /><br />
        <button type="submit" className="bw-btn">SUBMIT</button>
      </form>
    </>
  );
}

export default Form;
