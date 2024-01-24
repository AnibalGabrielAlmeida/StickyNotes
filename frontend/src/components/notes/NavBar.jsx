import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

const NavLink = ({ to, children }) => (
  <Link to={to} className="text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    {children}
  </Link>
);

const NavBar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-div">
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            <span className="app-title">QUICKY NOTES</span>
          </Link>
          <NavLink to="/create" className="navbar-link">CREATE</NavLink>
          <NavLink to="/tags" className="navbar-link">TAGS</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 