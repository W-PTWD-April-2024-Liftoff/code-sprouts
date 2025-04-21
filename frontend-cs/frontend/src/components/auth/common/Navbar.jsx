import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserService from "../../service/UserService";

function Navbar() {
  const isAuthenticated = UserService.isAuthenticated();
  const adminOnly = UserService.adminOnly();
  console.log("isAuthenticated?", isAuthenticated);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const encodedSearchQuery = encodeURIComponent(searchQuery);

  const handleLogout = () => {
    const confirmDelete = window.confirm("Are you sure you want to logout this user?");
    if (confirmDelete) {
      UserService.logout();
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (searchQuery.trim()) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/book/search?bookName=${encodedSearchQuery}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        navigate(`/book/search/${searchQuery}`, {
          state: { books: response.data },
        });
      } catch (error) {
        navigate(`/book/search/${searchQuery}`, { state: { books: [] } });
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">MyApp</Link>

      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {!isAuthenticated && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </>
        )}

        {isAuthenticated && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/book">Bookshelf All Books</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book/add">Add Books</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            {adminOnly && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/user-management">User Management</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
            </li>
          </>
        )}
      </ul>

      {/* 🔍 Compact and aligned search form */}
      {isAuthenticated && (
        <form className="d-flex" onSubmit={handleSearchSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ maxWidth: "200px" }}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      )}
    </nav>
  );
}

export default Navbar;
