import NavBar from "./NavBar";
import "./App.css";

function Instructions() {
  return (
    <>
      <NavBar />
      <div className="instructions-container">
        <h1 className="main-title">Instructions for Using the Student Management Portal</h1>
        <p className="intro-text">
          Welcome to the <strong>School Management Portal</strong>. Follow the instructions below to manage student applications efficiently.
        </p>

        <hr className="section-line" />
        <section>
          <h2>1. Viewing the Application Table</h2>
          <p>
            When you open the website, you are directed to the Application Table. This page lists all current applicants with the following details:
          </p>
          <ul>
            <li>Admission Number</li>
            <li>Name</li>
            <li>Phone</li>
            <li>Email</li>
            <li>ADM-Fee (Ksh)</li>
            <li>Action (Edit/Delete)</li>
          </ul>
        </section>

        <hr className="section-line" />
        <section>
          <h2>2. Adding a New Applicant</h2>
          <p>To register a new student:</p>
          <ol>
            <li>Navigate to the Student Registration Form.</li>
            <li>Fill in the applicant’s name, phone number, and email address.</li>
            <li>Click the "Submit" button to save the applicant.</li>
          </ol>
        </section>

        <hr className="section-line" />
        <section>
          <h2>3. Managing Applications</h2>
          <p>
            After submission, the new applicant appears in the Application Table. You can manage applications by editing or deleting them using the Action column.
          </p>
        </section>

        <hr className="section-line" />
        <section>
          <h2>4. Troubleshooting</h2>
          <p>If you're experiencing issues:</p>
          <ul>
            <li>Refresh the page to reload updated data.</li>
            <li>Ensure all required fields are completed before submitting.</li>
            <li>Contact technical support if problems persist.</li>
          </ul>
        </section>

        <hr className="section-line" />
        <section className="summary-box">
          <h3>Summary of Key Actions</h3>
          <ul>
            <li>View the Application Table to see all applicants.</li>
            <li>Use the Student Registration Form to add new students.</li>
            <li>Manage applications from the Action column.</li>
            <li>Reach out to support if issues occur.</li>
          </ul>
        </section>
        <hr className="section-line" />
      </div>
    </>
  );
}

export default Instructions;

