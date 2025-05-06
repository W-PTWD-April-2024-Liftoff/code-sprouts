import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const encodedSearchQuery = encodeURIComponent(searchQuery);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      try {

        const response = await axios.get(
          `http://localhost:8080/book/search?bookName=${encodedSearchQuery}`
        );
        if (response.data.length === 0) {
          alert("No books found for your search.");
        }
        navigate(`/book/search/${searchQuery}`, { state: { books: response.data, searchTerm: searchQuery } });
      } catch (error) {

        navigate(`/book/search/${searchQuery}`, { state: { books: []} });
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={""}>BookShelf</Link>
        <Link className="navbar-brand" to={"/book"}>All Books</Link>
        <Link className="navbar-brand" to={"/book/add"}>Add Books</Link>

        <form className="d-flex" onSubmit={handleSearchSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;