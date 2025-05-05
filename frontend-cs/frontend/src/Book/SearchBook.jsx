import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SaveFromApi from "./SaveFromApi";

const SearchResults = () => {
  const location = useLocation();
  const books = location.state ? location.state.books : <p>Book Not found</p>;
  const source = books.length > 0 ?
books[0].source || "The book you are searching is not available in the BookShelf,here is the similar results from internet": "No Book is Found";

const [selectedBook, setSelectedBook] = useState(null)
const [showModal, setShowModal] = useState(false)

const handleSave = (book) => {
  setSelectedBook(book);
  setShowModal(true);
};
  return (
    <div>
      <h2>Search Results</h2>
      <h2>Source: {source}</h2>

  
      {books.length > 0 ? (
        <ol>
          {books.map((book, index) => (
            <li key={book.id || index}>
              <b>Title: </b>{book.bookName} 
              <b>Author: </b>{book.author}
              <b>Category: </b>{book.category}
              <b>Description: </b>{book.description}
              <Link to="/book">View in BookShelf</Link>
              <button className="btn btn-outline-primary ms-3" onClick={() => handleSave(book)}>Save to BookShelf</button>
            </li>
          ))} 
        </ol>
      ) : (
        <p>No books found</p>
      )}
      <SaveFromApi
      show={showModal}
      onHide={() => setShowModal(false)}
      bookData={selectedBook}
      />
    </div>
  );
};

export default SearchResults;

