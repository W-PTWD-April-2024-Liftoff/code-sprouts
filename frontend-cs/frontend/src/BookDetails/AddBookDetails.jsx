import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddBookDetails = () => {
  const [bookDetails, setBookDetails] = useState({ description: '', rating: ''});
  const { description , rating } = bookDetails;
  const navigate = useNavigate();

  // Handle input changes for each field
  const handleInputChange = (e) => {
    setBook({ ...bookDetails, [e.target.name]: e.target.value });
  };

  // Save book details to the database
  const saveBookDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/bookDetails/add", bookDetails);
      navigate("/bookDetails");
    } catch (error) {
      console.error("Error saving the book details:", error.response ? error.response.data : error.message);
      alert("Error saving the book details");
    }
  };

  return (
<div className='col-sm-8 py-2 px-5'>
   
      <h3>Add Book</h3>
      <form onSubmit={saveBookDetails}>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='description'>
            Description
          </label>
          <input
            className='form-control-sm-6'
            type='text'
            name='description'
            id='description'
            required
            value={description} 
            onChange={handleInputChange} 
          />
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='rating'>
            Rating
          </label>
          <input
            className='form-control-sm-6'
            type='text'
            name='rating'
            id='rating'
            required
            value={rating} 
            onChange={handleInputChange}
          />
        </div>

        <div className="row">
          <div className="col-sm-2">
            <button type="submit" className='btn btn-outline-success btn-lg'>
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

export default AddBookDetails;
