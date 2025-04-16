// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddBook = () => {
//   const [book, setBook] = useState({ bookName: '', category: '', author: '', description: '', rating: '' });
//   const { bookName, category, author, description, rating } = book;
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setBook({ ...book, [e.target.name]: e.target.value });
//   };

//   const fetchBookFromApi = async (e) => {
//     e.preventDefault();
//     try {
//         const reponse = await axios.get('https://www.googleapis.com/books/v1/volumes?q=${query}')
//         setBooks(data.items)
//     } catch (error) {
//         console.error("Error fetching data: ", error);
//     }
//   };

//   const saveBook = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8080/book/add", book);
   
//       navigate("/book");
//     } catch (error) {
//       console.error("Error saving the book:", error.response ? error.response.data : error.message);
//       alert("Error saving the book");
//     }
//     }
//   };