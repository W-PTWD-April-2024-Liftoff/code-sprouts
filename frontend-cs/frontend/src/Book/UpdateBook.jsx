import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateBook = () => {
  const [book, setBook] = useState({ bookName: "", category: "", author: "" });
  const { bookName, category, author } = book;
  const navigate = useNavigate();
  const { id } = useParams();
  const handleInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
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
      setBook({ bookName: "", category: "", author: "" });
      navigate("/book");
    } catch (error) {
      console.error(
        "Error saving the book:",
        error.response ? error.response.data : error.message
      );
      alert("Error savaing the book");
    }
  };
  useEffect(() => {
    loadBook();
  }, [id]);
  const loadBook = async () => {
    const response = await axios.get(`http://localhost:8080/book/${id}`);
    setBook(response.data);
  };

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
            onChange={(e) => handleInputChange(e)}
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
