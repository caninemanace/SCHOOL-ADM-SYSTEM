function StudentCard({ students, onDelete }) {
  return (
    <>
      {students.map((student) => (
        <tr key={student.id}>
          <td>{student.id}</td>
          <td><span>👤</span> {student.name}</td>
          <td>{student.phone}</td>
          <td>{student.email}</td>
          <td>{student.fee}</td>
          <td>
            <button className="bw-btn">Edit</button>
            <button className="bw-btn" onClick={() => onDelete(student.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default StudentCard;
