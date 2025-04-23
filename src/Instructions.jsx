import NavBar from "./NavBar";
import "./App.css";

function Instructions(){
    return(
        <>
        <NavBar/>
        <h2>BELOW ARE INSTRUCTIONS FOR THE USE OF THE WEBSITE</h2>
        <p>Welcome to the school management portal! Below are the steps you need to follow to manage the student applications. </p>

        <h3>1. Viewing The Application Table.</h3>
        <p>When you open the website, you will be directed to the Application Table page. This page shows all the applicants who have applied for admission...</p>
            <ul>
                <li>Admission Number</li>
                <li>Name</li>
                <li>Phone</li>
                <li>Email</li>
                <li>ADM-Fee (ksh)</li>
                <li>Action</li>
            </ul>

            <h3>2. Adding a New Applicant</h3>
            <p>To add a new applicant to the database, follow these steps:</p>
            <ol>
                <li>Navigate to the Student Registration Form page.</li>
                <li>Fill in the form with the applicant's details.</li>
                <li>Click the SUBMIT button to add the student.</li>
            </ol>

            <h3>3. Managing Applications</h3>
            <p>Once an applicant has been added, return to the Application Table to see the newly added applicant in the list. You can perform actions like approving or rejecting an application from the Action column.</p>

            <h3>4. Troubleshooting</h3>
            <p>If the data is not appearing or there's an issue with submitting the form:</p>
            <ul>
                <li>Refresh the page to reload the data.</li>
                <li>Ensure that all form fields are filled correctly before submitting.</li>
                <li>Contact technical support if the issue persists.</li>
            </ul>

            <h4>Summary of Key Actions:</h4>
            <ul>
                <li>View the Application Table to see all applicants.</li>
                <li>Use the Student Registration Form to add new students.</li>
                <li>Process applications directly from the Application Table.</li>
                <li>Contact support if you experience any issues.</li>
            </ul>
            </>
    )
}


export default Instructions;