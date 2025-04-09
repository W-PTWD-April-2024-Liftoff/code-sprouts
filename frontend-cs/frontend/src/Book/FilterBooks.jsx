import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function BookFilter({ book }) {
    const [filterBooks, setFilterBooks] = useState('');
  
    const filteredBooks = books.filter(books =>
      book.name.toLowerCase().includes(filterBooks.toLowerCase())
    );
  
    return (
      <div>
        <input
          type="text"
          placeholder="Filter by name"
          value={filterBooks}
          onChange={e => setFilterBooks(e.target.value)}
        />
        <ul>
          {filteredBooks.map(item => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  return BookFilter