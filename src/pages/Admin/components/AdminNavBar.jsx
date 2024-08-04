// components/AdminNavBar.js
import React from "react";
import { Link } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/admin">Test</Link></li>
        {/* Add more admin links here */}
      </ul>
    </nav>
  );
};

export default AdminNavBar;
