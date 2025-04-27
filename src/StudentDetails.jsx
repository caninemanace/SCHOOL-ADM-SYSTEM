import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const admissionFee = 50000;

  useEffect(() => {
    fetch(`http://localhost:3000/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.error("Error fetching student details:", err));
  }, [id]);

  if (!student) {
    return <p>Loading student details...</p>;
  }

  const isFeeComplete = student.fee >= admissionFee;
  const balance = student.fee - admissionFee; // Calculate balance or excess

  const handleSendEmail = () => {
    alert(`Email sent to ${student.email} reminding them to complete their school fees.`);
  };

return (
    <>
        <NavBar />
        <div className="view-section" style={styles.container}>
            <h1 style={styles.heading}>Student Details</h1>
            <div style={styles.imageContainer}>
                <img
                    src={student.image || "https://via.placeholder.com/150"}
                    alt={`${student.name}'s profile`}
                    style={styles.image}
                />
            </div>
            <div style={styles.detailRow}>
                <strong>ID:</strong> <span>{student.id}</span>
            </div>
            <div style={styles.detailRow}>
                <strong>Name:</strong> <span>{student.name}</span>
            </div>
            <div style={styles.detailRow}>
                <strong>Contact:</strong> <span>{student.contact}</span>
            </div>
            <div style={styles.detailRow}>
                <strong>Email:</strong> <span>{student.email}</span>
            </div>
            <div style={styles.detailRow}>
                <strong>Fee Paid:</strong> <span>{student.fee.toLocaleString()} Ksh</span>
            </div>
            <div style={styles.detailRow}>
                <strong>Fee Status:</strong>{" "}
                {isFeeComplete ? (
                    <span style={styles.complete}>Complete</span>
                ) : (
                    <span style={styles.incomplete}>Incomplete</span>
                )}
            </div>
            <div style={styles.detailRow}>
                <strong>Balance:</strong>{" "}
                {balance >= 0 ? (
                    <span style={styles.excess}>Excess: {balance.toLocaleString()} Ksh</span>
                ) : (
                    <span style={styles.due}>Due: {Math.abs(balance).toLocaleString()} Ksh</span>
                )}
            </div>
            {!isFeeComplete && (
                <button style={styles.emailButton} onClick={handleSendEmail}>
                    Send Email Reminder
                </button>
            )}
            {balance > 0 && (
                <div style={styles.detailRow}>
                    <strong>Note:</strong>{" "}
                    <span>
                        The excess amount of {balance.toLocaleString()} Ksh has been credited to the student's school account.
                    </span>
                </div>
            )}
        </div>
    </>
);
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "20px auto",
    border: "1px solid black",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontSize: "30px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  imageContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #ccc",
  },
  detailRow: {
    marginBottom: "10px",
    fontSize: "18px",
    color: "#555",
  },
  complete: {
    color: "green",
    fontWeight: "bold",
  },
  incomplete: {
    color: "red",
    fontWeight: "bold",
  },
  excess: {
    color: "blue",
    fontWeight: "bold",
  },
  due: {
    color: "orange",
    fontWeight: "bold",
  },
  emailButton: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default StudentDetails;