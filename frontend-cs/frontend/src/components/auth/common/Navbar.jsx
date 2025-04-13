import React from "react";
import { Link } from "react-router-dom";
import UserService from "../../service/UserService";

function Navbar() {
  const isAuthenticated = UserService.isAuthenticated();
  //const isAdmin = UserService.isAdmin();
  const adminOnly = UserService.adminOnly();

  const handleLogout = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      UserService.logout();
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/book">Bookshelf All Books</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/book/add">Add Books</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
        {adminOnly && (
          <li>
            <Link to="/admin/user-management">User Management</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
