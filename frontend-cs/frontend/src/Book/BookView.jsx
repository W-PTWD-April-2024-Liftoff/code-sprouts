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

return (
    <section>
      <table className="table table-bordered table-hover ">
        <thead>
          <tr className="text-center">
            <th>Id</th>
           <th scope="col" colSpan={3}>Name</th>
             <th scope="col">Category</th>
             <th scope="col">Author</th>
            <th scope="col" colSpan={6}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {books.map((book, index) => (
            <tr key={book.id}>
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td colSpan={3}>{book.bookName}</td>
              <td>{book.category}</td>
              <td>{book.author}</td>
           <td>View </td>
           <td>Update</td>
           <td>Delete</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default BookView;
