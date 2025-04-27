import { useState, useEffect } from "react";
import NavBar from "./NavBar";

function Housing() {
  const [formData, setFormData] = useState({
    studentId: "",
    date: "",
    housingFee: "",
    house: "",
  });
  const [students, setStudents] = useState([]);
  const [housingApplications, setHousingApplications] = useState([]);
  const [houses, setHouses] = useState({
    north: { capacity: 10, image: "https://media.istockphoto.com/id/157476686/photo/university-lecture-hall-college-dorm-school-or-campus-education-building.jpg?s=612x612&w=0&k=20&c=vHUbXlEiNQvgK0Jo96SflLppzFgSxF-oHNC7UMVpOP8=" },
    south: { capacity: 8, image: "https://media.istockphoto.com/id/183064049/photo/dormitory-at-night.jpg?s=612x612&w=0&k=20&c=YNGw_IEYtT5sAt6Q8UMD15Q-K39f7jx2_fiUmsCVCOw=" },
    west: { capacity: 12, image: "https://www.pba.edu/wp-content/uploads/2023/05/campus-view-baxter-hall-outdoors-pba-palm-beach-atlantic-university-900x900-1.jpg" },
    east: { capacity: 15, image: "https://indianapolis.iu.edu/images/campus-life/housing/housing-north-hall-indianapolis.webp" },
  });

  useEffect(() => {
    
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));

    
    fetch("http://localhost:3000/housing")
      .then((res) => res.json())
      .then((data) => setHousingApplications(data))
      .catch((err) => console.error("Error fetching housing applications:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingApplication = housingApplications.find(
      (application) => application.studentId === formData.studentId
    );
    if (existingApplication) {
      alert("This student has already applied for housing.");
      return;
    }

   
    const updatedHouses = { ...houses };
    updatedHouses[formData.house].capacity -= 1;
    setHouses(updatedHouses);

   
    fetch("http://localhost:3000/housing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setHousingApplications((prev) => [...prev, data]);
        setFormData({ studentId: "", date: "", housingFee: "", house: "" });
      })
      .catch((err) => console.error("Error submitting housing application:", err));
  };

  const handleRemoveApplication = (id, house) => {
    
    const updatedHouses = { ...houses };
    updatedHouses[house].capacity += 1;
    setHouses(updatedHouses);

    
    fetch(`http://localhost:3000/housing/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setHousingApplications((prev) =>
          prev.filter((application) => application.id !== id)
        );
      })
      .catch((err) => console.error("Error removing application:", err));
  };

  return (
    <>
      <NavBar />
      <div className="housing-container" style={styles.container}>
        <h1 style={styles.heading}>Housing Application</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Student:</label>
          <select
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>

          <label style={styles.label}>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Housing Fee Paid:</label>
          <input
            type="number"
            name="housingFee"
            placeholder="Enter housing fee paid"
            value={formData.housingFee}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>House:</label>
          <div style={styles.houseSelection}>
            {Object.entries(houses).map(([key, house]) => (
              <div key={key} style={styles.houseOption}>
                <img
                  src={house.image}
                  alt={`${key} house`}
                  style={styles.houseImageLarge}
                />
                <label>
                  <input
                    type="radio"
                    name="house"
                    value={key}
                    checked={formData.house === key}
                    onChange={handleChange}
                    required
                  />
                  {key.charAt(0).toUpperCase() + key.slice(1)} House (Capacity: {house.capacity})
                </label>
              </div>
            ))}
          </div>

          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>

        <h2 style={styles.subHeading}>Housing Applications</h2>
        <div className="housing-cards" style={styles.cardsContainer}>
          {housingApplications.map((application) => {
            const student = students.find(
              (student) => student.id === application.studentId
            );
            const balance = application.housingFee - 40000;

            return (
              <div key={application.id} style={styles.card}>
                <div style={styles.cardLeft}>
                  <img
                    src={student?.image || "https://via.placeholder.com/300"}
                    alt={`${student?.name}'s profile`}
                    style={styles.cardImageLarge}
                  />
                </div>
                <div style={styles.cardRight}>
                  <p><strong>Name:</strong> {student?.name}</p>
                  <p><strong>Date:</strong> {application.date}</p>
                  <p><strong>House:</strong> {application.house.charAt(0).toUpperCase() + application.house.slice(1)}</p>
                  <img
                    src={houses[application.house]?.image}
                    alt={`${application.house} house`}
                    style={styles.houseImageSmall}
                  />
                  <p>
                    <strong>Housing Fee Status:</strong>{" "}
                    {balance >= 0 ? (
                      <span style={styles.complete}>Complete</span>
                    ) : (
                      <span style={styles.incomplete}>Incomplete</span>
                    )}
                  </p>
                  {balance > 0 && (
                    <p>
                      <strong>Excess:</strong> {balance} Ksh
                    </p>
                  )}
                  {balance > 0 && (
                    <p style={styles.note}>
                      <strong>Note:</strong> Excess will be distributed to other semesters.
                    </p>
                  )}
                  <button
                    style={styles.removeButton}
                    onClick={() => handleRemoveApplication(application.id, application.house)}
                  >
                    Remove Application
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "20px auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  houseSelection: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  houseOption: {
    textAlign: "center",
  },
  houseImageLarge: {
    width: "200px",
    height: "200px",
    borderRadius: "8px",
    objectFit: "cover",
    marginBottom: "5px",
  },
  houseImageSmall: {
    width: "150px",
    height: "150px",
    borderRadius: "8px",
    objectFit: "cover",
    marginBottom: "10px",
  },
  submitButton: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  subHeading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  cardLeft: {
    flex: "1",
  },
  cardRight: {
    flex: "2",
  },
  cardImageLarge: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  complete: {
    color: "green",
    fontWeight: "bold",
  },
  incomplete: {
    color: "red",
    fontWeight: "bold",
  },
  note: {
    color: "blue",
    fontStyle: "italic",
  },
  removeButton: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Housing;