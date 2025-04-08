import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; 

function Details() {
  const { id } = useParams(); 
  const [bookDetails, setBookDetails] = useState(null); 

  useEffect(() => {
    loadBookDetails(); 
  }, [id]); 

  const loadBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/bookDetails/viewById/${id}`);
      setBookDetails(response.data); 
    } catch (error) {
      console.error("Error fetching book details:", error);
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
                <b>Id:</b> {bookDetails.id}
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Description:</b> {bookDetails.description}
                  </li>

                  <li className="list-group-item">
                    <b>Rating:</b> {bookDetails.rating}
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

export default Details;
