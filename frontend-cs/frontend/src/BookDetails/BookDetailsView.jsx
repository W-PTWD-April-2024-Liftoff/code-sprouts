import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

function BookDetailsView () {
  const [booksDetails,setBookDetails] =useState([]);
  useEffect(() => {
    loadBookDetails();
  }, []);
  const loadBookDetails = async () => {
    const response = await axios.get("http://localhost:8080/bookDetails", {
      validateStatus: (status) => status === 200 || status === 302,
    });
    if (response.status === 200 || response.status === 302) {
      setBookDetails(response.data);
    } else {
      console.error("Failed to fetch books details:", response.status);
    }
  };
  const handleDelete =async(id) =>{
    await axios.delete(`http://localhost:8080/bookDetails/delete/${id}`);
  
  loadBookDetails();
  }
 


return (
  <section>
  <div className="table-responsive">
    <table className="table table-bordered table-hover">
      <thead>
        <tr className="text-center">
          <th>Id</th>
          <th scope="col">Description</th>
          <th scope="col">Rating</th>
          <th scope="col" colSpan={3}>Actions</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {booksDetails.map((bookDetails, index) => (
          <tr key={bookDetails.id}>
            <th scope="row">{index + 1}</th>
            <td>{bookDetails.description}</td>
            <td>{bookDetails.rating}</td>
            <td className="d-flex justify-content-center">
            <td>
              <Link to={`/bookDetails/viewById/${bookDetails.id}`} className="btn btn-primary mt-2" >View</Link>
              </td>
              <td>
            <Link to ={`/bookDetails/update/${bookDetails.id}`}className="btn btn-success mt-2" > Update</Link>
            </td>
              <button className="btn btn-danger mt-2" onClick={() => handleDelete(bookDetails.id)}>Delete</button>
               </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
         
      
  );
}

export default BookDetailsView;
