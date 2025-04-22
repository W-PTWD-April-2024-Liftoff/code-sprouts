import React from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const books = location.state ? location.state.books : <p>Book Not found</p>;
  const source = books.length > 0 ?
books[0].source || "The book you are searching is not available in the BookShelf,here is the similar results from internet": "No Book is Found";

  return (
    <div>
      <h2>Search Results</h2>
      <h2>Source: {source}</h2>

  
      {books.length > 0 ? (
        <ol>
          {books.map((book, index) => (
            <li key={book.id || index}>
              <b>Title: </b>{book.bookName} 
              <b>   Author: </b>{book.author}
              <b>   Category: </b>{book.category}<Link to="/book">View in BookShelf</Link>
            </li>
          ))} 
        </ol>
      ) : (
        <p>No books found</p>
      )}
    </div>
  );
};

export default SearchResults;





//to be continued formatting
 {/* <table align="center" border="1">
        <tr>
          <th>Title:</th>
          <th>Author:</th>
          <th>Category:</th>
          <th>View in BookShelf</th>
        </tr>
      {books.length > 0 ? (
        <tr>
          {books.map((book, index) => (
            <td key={book.id || index}
            <td>{book.author}</td>
            <td> key={book.id || index}{book.category}</td>
            <td><Link to="/book">View in BookShelf</Link></td><tr></tr>
          ))}
      ) : (
        <p>No books found</p>
      )}
      </table>
    </div>
  );
}; */}