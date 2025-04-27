import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" style={styles.link}>
        Go Back to Home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f5f5f5",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: "36px",
    color: "#333",
    marginBottom: "20px",
  },
  message: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px",
  },
  link: {
    fontSize: "16px",
    color: "#007bff",
    textDecoration: "none",
    padding: "10px 20px",
    border: "1px solid #007bff",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  },
  linkHover: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
};

export default ErrorPage;