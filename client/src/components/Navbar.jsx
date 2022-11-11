import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div></div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/signup">Register</Link>
        <Link to="/signin">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
