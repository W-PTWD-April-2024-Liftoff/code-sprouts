import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddBook = () => {
  const [book, setBook] = useState({
    bookName: "",
    category: "",
    author: "",
    description: "",
    rating: "",
    isRead: false,
  });
  const { bookName, category, author, description, rating, isRead } = book;
  const navigate = useNavigate();

  // Handle input changes for each field
  const handleInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Save book to the database
  const saveBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/book/add",
        book,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="description">
            Description
          </label>
          <input
            className="form-control-sm-6"
            type="text"
            name="description"
            id="description"
            required
            value={description}
            onChange={handleInputChange}
          />
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="rating">
            Rating
          </label>
          <input
            className="form-control-sm-6"
            type="text"
            name="rating"
            id="rating"
            required
            value={rating}
            onChange={handleInputChange}
          />
        </div>

        {/* <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="isRead">
            Is Read? Enter yes
          </label>
          <input
            className="form-control-sm-6"
            type="text"
            name="isRead"
            id="isRead"
            required
            value={isRead}
            onChange={handleInputChange}
          />
        </div> */}

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
