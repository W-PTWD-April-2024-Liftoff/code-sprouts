import React, { useState, useEffect } from "react";
import axios from "axios";


function BookView () {
  const [books,setBooks] =useState([]);
  useEffect(() => {
    loadBooks();
  }, []);
  const loadBooks = async () => {
    const response = await axios.get("http://localhost:8080/book", {
      validateStatus: (status) => status === 200 || status === 302,
    });
    if (response.status === 200 || response.status === 302) {
      setBooks(response.data);
    } else {
      console.error("Failed to fetch books:", response.status);
    }
  };
  const handleDelete =async(id) =>{
    await axios.delete(`http://localhost:8080/book/delete/${id}`);
  
  loadBooks();
  }
 


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
          <th scope="col" colSpan={3}>Actions</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {books.map((book, index) => (
          <tr key={book.id}>
            <th scope="row">{index + 1}</th>
            <td>{book.bookName}</td>
            <td>{book.category}</td>
            <td>{book.author}</td>
            <td className="d-flex justify-content-center">
              <button className="btn btn-primary mx-1 mt-2">View</button>
              <button className="btn btn-success mx-1 mt-2">Update</button>
              <button className="btn btn-danger mt-2" onClick={() => handleDelete(book.id)}>Delete</button>
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
