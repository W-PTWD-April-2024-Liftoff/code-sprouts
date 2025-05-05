import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const UpdateBook = () => {
  const [book, setBook] = useState({
    bookName: "",
    category: "",
    author: "",
    description: "",
    rating: "1",
    isRead: false,
  });
  const { bookName, category, author, description, rating, isRead } = book;
  const navigate = useNavigate();
  const { id } = useParams();
  const handleInputChange = (e) => {
    const {name, value, type, checked} = e.target;
    setBook({ ...book, [name]: type === "checkbox" ? checked : value});
  };
  const updateBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/book/update/${id}`,
        book,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(book);
      setBook({
        bookName: "",
        category: "",
        author: "",
        description: "",
        rating: "1",
        isRead: "false",
      });
      navigate("/book");
    } catch (error) {
      console.error(
        "Error saving the book:",
        error.response ? error.response.data : error.message
      );
      alert("Error saving the book");
    }
  };
  useEffect(() => {
    loadBook();
  }, [id]);
  const loadBook = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:8080/book/${id}`, book, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBook(response.data);
  };

  const ratingOptions = [];
  for (let i = 1; i <= 5; i++) {
    const stars = "★".repeat(i) + "☆".repeat(5 - i);
    ratingOptions.push(
      <option key={i} value={i}>
        {stars} ({i})
      </option>
    );
  }

  return (
    <div className="col-sm-8 py-2 px-5">
      <form onSubmit={updateBook}>
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
          ></input>
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
          ></input>
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
            onChange={(e) => handleInputChange(e)}
          ></input>
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
            ></input>
          </div>
          <div className="input-group mb-5">
            <label className="input-group-text" htmlFor="rating">
              Rating
            </label>
            <select
              className="form-control-sm-6"
              type="number"
              name="rating"
              id="rating"
              required
              value={rating}
              onChange={handleInputChange}
            >
              <option value=""> Select A Rating</option>
              {ratingOptions}
            </select>
          </div> 
        </div>
        <div className="row">
          <div className="col-sm-2">
            <button type="submit" className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>
          <div className="col-sm-2">
            <Link to="/book" className="btn btn-outline-warning btn-lg">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
