import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    loadBook();
  }, [id]);

  const loadBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/book/viewById/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Book Details</h2>

            <div className="card">
              <div className="card-header">
                <b>Id:</b> {book.id}
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Name:</b> {book.bookName}
                  </li>

                  <li className="list-group-item">
                    <b>Category:</b> {book.category}
                  </li>
                  <li className="list-group-item">
                    <b>Author:</b> {book.author}
                  </li>
                  <li className="list-group-item">
                    <b>Description:</b> {book.description}
                  </li>

                  <li className="list-group-item">
                    <b>Rating:</b> {book.rating} <span>&#9733;</span>
                  </li>

                  <li className="list-group-item">
                    <b>Notes:</b> {book.notes}
                  </li>

                  <li className="list-group-item">
                    <b>Custom Tag:</b> {book.customTag}
                  </li>

                  <li className="list-group-item">
                    <b>Is Read?:</b> {book.isRead}
                  </li>
                </ul>
              </div>
            </div>

            <Link className="btn btn-primary my-2" to="/book">
              Back to All Books
            </Link>
            <Link className="btn btn-primary my-2" to="/book/read">
              Back to Read Stats
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetails;
