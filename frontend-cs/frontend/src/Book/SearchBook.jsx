import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const books = location.state ? location.state.books : <p>Book Not found</p>;
  const source = books.length > 0 ?
books[0].source || "The book you are searching is not available in the BookShelf,here is the similar results from internet": "No Book is Found";

  return (
    <div>
      <h2>Search Results</h2>
      <h3>Source: {source}</h3>

      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => (
            <li key={book.id || index}>
              <b>{book.bookName} </b> - {book.category} - <b>{book.author}</b>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found</p>
      )}
    </div>
  );
};

export default SearchResults;
