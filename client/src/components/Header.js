import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const obj = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.reload(true);
  };
  return (
    <div>
      <Link to="/">Home Page</Link>
      <br />
      {obj?.username && <button onClick={logout}>Logout</button>}
      {!obj?.username && (
        <div>
          <Link to="/register">Register Page</Link>
          <br />
          <Link to="/login">Login Page</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
