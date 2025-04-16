import React from "react";
import { Link } from "react-router-dom";
import UserService from "../../service/UserService";
// import SearchResults from "../../../Book/SearchBook";

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

  // const [searchQuery, setSearchQuery] = useState("");
  // const navigate = useNavigate();
  // const encodedSearchQuery = encodeURIComponent(searchQuery);

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  // const handleSearchSubmit = async (e) => {
  //   e.preventDefault();

  //   if (searchQuery.trim()) {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get(
  //         `http://localhost:8080/book/search?bookName=${encodedSearchQuery}`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );
  //       if (response.data.length === 0) {
  //         alert("No books found for your search.");
  //       }
  //       navigate(`/book/search/${searchQuery}`, {
  //         state: { books: response.data },
  //       });
  //     } catch (error) {
  //       navigate(`/book/search/${searchQuery}`, { state: { books: [] } });
  //     }
  //   }
  // };

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
            {/* <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
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
