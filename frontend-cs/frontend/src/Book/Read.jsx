import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

function Read() {
  const [books, setBooks] = useState([]);
  const [showReadBooks, setShowReadBooks] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:8080/book",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      {
        validateStatus: (status) => status === 200 || status === 302,
      }
    );
    if (response.status === 200 || response.status === 302) {
      setBooks(response.data);
    } else {
      console.error("Failed to fetch books:", response.status);
    }
  };
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8080/book/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    loadBooks();
  };

  const handleMarkAsRead = async (id) => {
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:8080/book/markasread/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Book Marked as Read");
    loadBooks();
  };

  const handleMarkAsUnRead = async (id) => {
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:8080/book/markasunread/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Book Marked as Unread");
    loadBooks();
  };

  const handleToggleReadStatus = async (id, currentStatus) => {
    const token = localStorage.getItem("token");
    const endpoint = currentStatus
      ? `http://localhost:8080/book/markasunread/${id}`
      : `http://localhost:8080/book/markasread/${id}`;
    await axios.put(endpoint, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadBooks(); // Refresh book list
  };
  

//Stats Calculations
const totalBooks = books.length;
const readBooks = books.filter((book) => book.read === true).length;
const unreadBooks = totalBooks - readBooks;
const percentRead = totalBooks > 0 ? Math.round((readBooks / totalBooks) * 100) : 0;


  return (
    
    <section>
{/*Summary Dashboard */}
<div className="mb-4">
        <h3 className="text-center mb-3">📚 Library Summary</h3>
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>Total Books in BookShelf</th>
              <th>Read</th>
              <th>Unread</th>
              <th>% of Books Read</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalBooks}</td>
              <td>{readBooks}</td>
              <td>{unreadBooks}</td>
              <td>{percentRead}%</td>
            </tr>
          </tbody>
        </table>
        {/* Progress Bar */}
        <div className="progress" style={{ height: "25px" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${percentRead}%` }}
          >
            {percentRead}%
          </div>
        </div>
      </div>

      {/* 🔘 Toggle Switch */}
      
      <div className="d-flex justify-content-center align-items-center mb-4">
        <label className="form-check form-switch fs-5">
          <input
            className="form-check-input"
            type="checkbox"
            checked={showReadBooks}
            onChange={() => setShowReadBooks(!showReadBooks)}
          />
          <span className="ms-2">{showReadBooks ? "Showing Read Books" : "Showing Unread Books"}</span>
        </label>
      </div>

{/*Read books table */}
      <div className="table-responsive">
        <h3 text align="center">{showReadBooks ? "Read Books" : "Unread Books"}</h3>
        <table className="table table-bordered table-hover">
          <thead>
            <tr className="text-center">
              <th>Id</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Author</th>
              <th scope="col">Description</th>
              <th scope="col">Rating</th>
              <th scope="col">Is Read?</th>
              <th scope="col" colSpan={3}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
          {books.filter((book) => book.read === showReadBooks)
                .map((book, index) => (
              <tr key={book.id}>
                <th scope="row">{index + 1}</th>
                <td>{book.bookName}</td>
                <td>{book.category}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>{book.rating}</td>
                <td>{book.read ? "Yes" : "No"}</td>
                <td className="d-flex justify-content-center">
            
                <label className="form-check form-switch" style={{ marginTop: "8px", marginLeft: "8px" }}>
  <input
    className="form-check-input"
    type="checkbox"
    role="switch"
    checked={book.read}
    onChange={() => handleToggleReadStatus(book.id, book.read)}
    style={{
      backgroundColor: book.read ? "#f8d7da" : "#f8d7da", 
      borderColor: "#f5c6cb",
      cursor: "pointer",
    }}
  />
  <span style={{
    marginLeft: "5px",
    marginRight: "10px",
    color: book.read ? "#6c757d" : "#721c24",
    fontWeight: "bold"
  }}>
    {book.read ? "Unread  " : "Read  "}
  </span>
</label>


                {/* <button
                className="btn btn-sm mt-2 me-1"
                disabled={book.read}
                  style={{
                    backgroundColor: book.read ? "#e0e0e0" : "#f8d7da", // gray if read, light pink otherwise
                    color: book.read ? "#6c757d" : "#721c24",           // dimmed text if read
                    border: book.read ? "2px solid #ccc" : "4px solid #f5c6cb",
                    marginTop: "8px",
                    marginLeft: "8px",
                      cursor: book.read ? "not-allowed" : "pointer"
                  }}
                   onClick={() => !book.read && handleMarkAsRead(book.id)}
                    >
                       Mark as Read
                    </button> */}

              
                    <Link
                      to={`/book/viewById/${book.id}`}
                      className="btn btn-primary mt-2 me-1 ms-3"
                    
                    >
                      View
                    </Link>
                  
                  
                    <Link
                      to={`/book/update/${book.id}`}
                      className="btn btn-success mt-2 me-1"
                    >
                      {" "}
                      Update
                    </Link>
             
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Read;
