function StudentCard({ students }) {
    return (
      <>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.phone}</td>
            <td>{student.email}</td>
            <td>{student.fee}</td>
          </tr>
        ))}
      </>
    );
  }
  
  export default StudentCard;
  