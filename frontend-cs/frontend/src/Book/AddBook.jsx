import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddBook = () => {
  const [book, setBook] = useState({ bookName: "", category: "", author: "" });
  const { bookName, category, author } = book;
  const navigate = useNavigate();

  // Handle input changes for each field
  const handleInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Save book to the database
  const saveBook = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/book/add", book);
      //  console.log( book);
      //setBook({ bookName: "", category: "", author: "" });
      navigate("/book");
    } catch (error) {
      console.error(
        "Error saving the book:",
        error.response ? error.response.data : error.message
      );
      alert("Error saving the book");
    }
  };

  return (
    <div className="col-sm-8 py-2 px-5">
      <h3>Add Book</h3>
      <form onSubmit={saveBook}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="bookName">
            Name
          </label>
          <input
            className="form-control-sm-6"
            type="text"
            name="bookName"
            id="bookName"
            required
            value={bookName}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="category">
            Category
          </label>
          <input
            className="form-control-sm-6"
            type="text"
            name="category"
            id="category"
            required
            value={category}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="author">
            Author
          </label>
          <input
            className="form-control-sm-6"
            type="text"
            name="author"
            id="author"
            required
            value={author}
            onChange={handleInputChange}
          />
        </div>

        <div className="row">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>
          <div className="col-sm-4">
            <Link to="/book" className="btn btn-outline-warning btn-lg">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
