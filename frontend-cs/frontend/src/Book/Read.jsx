import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

function Read() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    loadBooks();
  }, []);
  const loadBooks = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:8080/book/isRead",
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

  return (
    <section>
      <div className="table-responsive">
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
                <td>{book.rating}</td>
                <td>{book.isRead}</td>
                <td className="d-flex justify-content-center">
                  <td>
                    <Link
                      to={`/book/viewById/${book.id}`}
                      className="btn btn-primary mt-2"
                    >
                      View
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/book/update/${book.id}`}
                      className="btn btn-success mt-2"
                    >
                      {" "}
                      Update
                    </Link>
                  </td>
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
