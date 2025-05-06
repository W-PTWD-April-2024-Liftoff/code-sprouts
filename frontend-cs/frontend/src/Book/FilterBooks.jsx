import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

function FilterBooks() {
const [books, setBooks] = useState([]);
const [categories, setCategories] = useState(['All']);
const [customTags, setCustomTags] = useState(['All']);
const [filters, setFilters] = useState({
  category: 'All',
  rating: '',
  customTag: 'All'
})

useEffect(() => {
  const token = localStorage.getItem("token");
  axios.get('http://localhost:8080/book/categories', {headers: { Authorization: `Bearer ${token}` }})
  .then(response => setCategories(['All', ...response.data]))
  .catch(error => console.error('Error loading categories:', error))
}, []);

useEffect(() => {
  const token = localStorage.getItem("token");
  axios.get('http://localhost:8080/book/customTags', 
    {headers: {Authorization: `Bearer ${token}`}})
    .then(response => setCustomTags(['All', ...response.data]))
    .catch(error => console.error('Error loading Custom Tags: ', error));
}, []);

useEffect(() => {
  const params = {};
  const token = localStorage.getItem("token");
  if (filters.category !== 'All') params.category = filters.category;
  if (filters.rating !== '') params.rating = filters.rating;
  if (filters.customTag !== 'All') params.customTag = filters.customTag;
  
  axios.get("http://localhost:8080/book/filter", {params, headers: { Authorization: `Bearer ${token}`}})
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
        <option key={ratings} value={ratings}>{ratings} &#9733; </option>
      ))}
    </select>
    <label>Custom Tag</label>
    <select value = {filters.customTag}
    onChange={(e) => setFilters({...filters, customTag: e.target.value})}>
      {customTags.map((customTag) => (
        <option key={customTag} value={customTag}>{customTag}</option>
      ))}
    </select>
    <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Author</th>
                  <th scope="col">Description</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Notes</th>
                  <th scope="col">Custom Tag</th>
                  <th scope="col">Is Read?</th>
                  <th scope="col" colSpan={3}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
              {books.length > 0 ? (
        books.map((book, index) => (
          <tr key={book.id}>
            <th scope="row">{index + 1}</th>
            <td>{book.bookName}</td>
            <td>{book.category}</td>
            <td>{book.author}</td>
            <td>{book.description}</td>
            <td>{book.rating} &#9733; </td>
            <td>{book.notes}</td>
            <td>{book.customTag}</td>
            <td>{book.isRead ? "Yes" : "No"}</td>
            <td className="d-flex justify-content-center">
              <Link
                to={`/book/viewById/${book.id}`}
                className="btn btn-primary mt-2"
              >
                View
              </Link>
              <Link
                to={`/book/update/${book.id}`}
                className="btn btn-success mt-2"
              >
                Update
              </Link>
              <button
                className="btn btn-danger mt-2"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8" className="text-center">
            <p>No books found that match the filter</p>
          </td>
        </tr>
      )}
    </tbody>
  </table>
    </div>
);
  };
  
  export default FilterBooks;