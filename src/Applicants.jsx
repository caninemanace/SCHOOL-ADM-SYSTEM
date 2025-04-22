import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './NavBar'; // Optional: Remove if not using
import StudentCard from './StudentCard';


function Applicants() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  return (
    <>
      <NavBar /> {/* Optional: comment/remove if not implemented */}
      <h1>Applicants Table</h1>
      <div>
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Admission No</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            <StudentCard students={students} />
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Applicants;
