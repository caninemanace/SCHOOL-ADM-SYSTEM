import { Link } from "react-router-dom";

function StudentCard({ students, onDelete, onEdit }) {
  return (
    <>
      {students.map((student) => (
        <tr key={student.id}>
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.contact}</td>
          <td>{student.email}</td>
          <td>{student.course}</td>
          <td>{student.fee}</td>     
          <td>
            <button className="bw-btn" onClick={() => onEdit(student)}>Edit</button>
            <button className="bw-btn" onClick={() => onDelete(student.id)}>Delete</button>
            <Link to={`/students/${student.id}`}>
              <button className="bw-btn">View</button>
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
}

export default StudentCard;

