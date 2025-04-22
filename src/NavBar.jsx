import { NavLink } from "react-router-dom";
import './App.css';

function NavBar(){
   return(
    <nav>
        <NavLink to="/" className="nav-link">Applicants</NavLink>
        <NavLink to="/form" className="nav-link">Form</NavLink>
        <NavLink to="/Instruction" className="nav-link">Instructions</NavLink>
    </nav>
   )
}
export default NavBar;