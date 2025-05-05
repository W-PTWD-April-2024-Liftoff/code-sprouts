import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import Rating from "react-rating-stars-component";
import { FaStar, FaRegStar} from "react-icons/fa";

function BookView() {
  const [books, setBooks] = useState([]);
  const [userRating, setUserRating] = useState(0);
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

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };
  
  const saveRating = () => {
    const token = localStorage.getItem("token");
    axios
      .post(`http://localhost:8080/book/${bookId}/rate?rating=${userRating}`, {headers: {Authorization: `Bearer ${token}`},})
      .then((response) => {
        alert("Rating saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving rating:", error);
      });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} color="#ffc107"/>
        ) : (
          <FaRegStar key={i} color="#e4e5e9"/>
        )
      );
    }
    return stars;
  }

  return (
    
    <section>
      <div className="table-responsive">
        <h3 text align="center">All Books</h3>
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
            {books.map((book, index) => (
              <tr key={book.id}>
                <th scope="row">{index + 1}</th>
                <td>{book.bookName}</td>
                <td>{book.category}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>{renderStars(book.rating)}</td>
                <td>{(book.read === true)? "Yes" : "No"}</td>
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
    {book.read ? "Unread" : "Read"}
  </span>
</label>

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

export default BookView;
