import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './NavBar';
import StudentCard from './StudentCard';

function Applicants() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/students/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== id)
        );
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const handleEdit = (student) => {
    setEditingStudent(student); 
  };

  const handleUpdate = (updatedStudent) => {
    fetch(`http://localhost:3000/students/${updatedStudent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then((data) => {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === data.id ? data : student
          )
        );
        setEditingStudent(null); 
      })
      .catch((err) => console.error("Update error:", err));
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <h1>APPLICATION TABLE</h1>
      <div>
        
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            marginBottom: "20px",
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        {editingStudent ? (
          <EditForm
            student={editingStudent}
            onUpdate={handleUpdate}
            onCancel={() => setEditingStudent(null)} 
          />
        ) : (
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
              <StudentCard
                students={filteredStudents} 
                onDelete={handleDelete}
                onEdit={handleEdit} 
              />
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

function EditForm({ student, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({ ...student });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); 
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Edit Student</h2>
      <div>
        <label>ID:</label>
        <input type="text" value={formData.id} disabled />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Fee:</label>
        <input
          type="number"
          name="fee"
          value={formData.fee}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default Applicants;
