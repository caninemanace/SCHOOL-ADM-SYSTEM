function StudentCard({ students, onDelete, onEdit }) {
  return (
    <>
      {students.map((student) => (
        <tr key={student.id}>
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.phone}</td>
          <td>{student.email}</td>
          <td>{student.course}</td>
          <td>{student.fee}</td>     
          <td>
            <button className="bw-btn" onClick={() => onEdit(student)}>Edit</button>
            <button className="bw-btn" onClick={() => onDelete(student.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default StudentCard;

