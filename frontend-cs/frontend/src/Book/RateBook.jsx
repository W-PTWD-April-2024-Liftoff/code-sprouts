import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";

const RateBook = ({book}) => {
    const [rating, setRating] = useState(0);
    const [isRead, setIsRead] = useState(book.isRead);

    const handleRatingChange = (newRating) => {
        setRating(newRating + 1);
    };

    const saveRating = () => {
        const token = localStorage.getItem("token");

        if(!isRead) {
            alert("You must mark book as read to rate it");
            return;
        }

        axios.post(`http://localhost:8080/book/${book.id}/rate?rating=${rating}`, {headers: {Authorization: `Bearer ${token}`}})
        .then(response => {
            alert("Rating saved successfulty")
        })
        .catch(error => {
            console.error("Cannot save rating", error);
        })
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i < rating) {
                stars.push(<FaStar key={i} onClick={() => handleRatingChange(i)} color="#ffd700"/>);
            } else {
                stars.push(<FaRegStar key={i} onClick={() => handleRatingChange(i)} color="ffd700"/>);
            }
        }
        return stars;
    }

    const handleMarkAsRead = async (id) => {
        const token = localStorage.getItem("token");
        await axios.put(`http://localhost:8080/book/markasread/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Book Marked as Read");
        
        loadBooks();
    
      };
    
      const handleToggleReadStatus = async (id, currentStatus) => {
        const token = localStorage.getItem("token");
        const endpoint = currentStatus
          ? `http://localhost:8080/book/markasunread/${id}`
          : `http://localhost:8080/book/markasread/${id}`;
        await axios.put(endpoint, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        loadBooks(); // Refresh book list
      };

    return (
        <div>
            <h3> Rate this book</h3>

            {isRead ? (
                <>
            <div>{renderStars(rating)}</div>
      <button onClick={saveRating}>Submit Rating</button>
                </>
            ) : (
                <p>You must mark the book as read to rate it</p>
      )}
    </div>
    );
}

export default RateBook;