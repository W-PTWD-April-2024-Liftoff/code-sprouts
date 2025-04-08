import React from 'react';
import { useState,useEffect } from 'react';
import { Link,useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateBookDetails = () => {

     const [bookDetails, setBookDetails] = useState({description:'',rating:''});
     const {description, rating} = bookDetails;
     const navigate = useNavigate();
     const {id} = useParams();
     const handleInputChange =(e) =>{
        setBookDetails({...bookDetails,[e.target.name]:e.target.value});
};
const updateBookDetails = async(e) =>{
     e.preventDefault();
     try{
      const response = await axios.put(`http://localhost:8080/bookDetails/update/${id}`, book);
      console.log(bookDetails);
      setBook({ description: '', rating: ''});
    navigate("/bookDetails")
     }
     catch(error)
     {
        console.error("Error saving the book details:", error.response ? error.response.data : error.message);
        alert("Error saving the book details");
     }
 };
useEffect(() => {
    loadBookDetails();
  }, [id]);
  const loadBookDetails = async () => {
    const response = await axios.get (`http://localhost:8080/bookDetails/${id}`)
     setBookDetails(response.data);
    }
 

return(
    <div className='col-sm-8 py-2 px-5'>
            <form onSubmit= {updateBookDetails}>
                 <div className='input-group mb-5'>
<label className='input-group-text' htmlFor='description'>
    Description
</label>
<input className='form-control-sm-6'
 type='text' name='description' 
 id='description' required
  value={description}
  onChange = { handleInputChange}
  >
</input>
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
  onChange = {(e) => handleInputChange(e)}
  >
</input>
                    </div>
                    <div className="row">
    <div className="col-sm-2">
        <button  type="submit" className='btn btn-outline-success btn-lg'>
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

    )
}

export default UpdateBookDetails;