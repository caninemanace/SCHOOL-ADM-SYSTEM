import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './NavBar';
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
      <NavBar />
      <h1>APPLICATION TABLE</h1>
      <div>
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Admission No</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>ADM-Fee (ksh)</th>
              <th>Action</th>
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