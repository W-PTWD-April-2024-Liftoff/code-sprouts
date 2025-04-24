import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

function FilterBooks() {
const [books, setBooks] = useState([]);
const [categories, setCategories] = useState(['All']);
const [filters, setFilters] = useState({
  category: 'All',
  rating: '',
})

useEffect(() => {
  const token = localStorage.getItem("token");
  axios.get('http://localhost:8080/book/categories', {headers: { Authorization: `Bearer ${token}` }})
  .then(response => setCategories(['All', ...response.data]))
  .catch(error => console.error('Error loading categories:', error))
}, []);
useEffect(() => {
  const params = {};
  const token = localStorage.getItem("token");
  if (filters.category !== 'All') params.category = filters.category;
  if (filters.rating !== '') params.rating = filters.rating;
  
  axios.get("http://localhost:8080/book", {params, headers: { Authorization: `Bearer ${token}`}})
      .then(response => setBooks(response.data))
      .catch(error => console.error("Error fetching books:", error));
}, [filters]);

return (
  <div>
    <h2>Book Filter</h2>
    <lable>Category: </lable>
    <select value = {filters.category}
    onChange={(e) => setFilters({...filters, category: e.target.value})}>
      {categories.map((category) => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
    <label>Rating: </label>
    <select value = {filters.rating}
    onChange={(e) => setFilters({...filters, rating: e.target.value})} >
      <option value="">Any</option>
      {[1,2,3,4,5].map((ratings)=> (
        <option key={ratings} value={ratings}>{ratings}</option>
      ))}
    </select>
    {/* <label>Read: </label>
    <select value={filters.read}
    onChange={(e)=> setFilters({...filters, read: e.target.value})} >
      <option value="">Any</option>
      <option value="true">Read</option>
      <option value="false">Unread</option>
    </select> */}
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
       <p> No books found that match the filter</p>
    </div>
);
  };
  
  export default FilterBooks;

