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
      const response = await axios.get(`http://localhost:8080/book/viewById/${id}`);
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
                </ul>
              </div>
            </div>

            <Link className="btn btn-primary my-2" to="/book">
              Back to Bookshelf
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetails;
