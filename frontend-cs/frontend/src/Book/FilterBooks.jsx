import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

function FilterBooks({ book }) {
    const [selectedFilter, setSelectedFilter] = useState('');
    const [filterOptions, setFilterOptions] = useState([]);


    useEffect(() => {
        loadBooks();
        loadFilterData();
      }, []);
      const loadBooks = async () => {
        const response = await axios.get("http://localhost:8080/book", {
          validateStatus: (status) => status === 200 || status === 302,
        });
        if (response.status === 200 || response.status === 302) {
          setBooks(response.data);
        } else {
          console.error("Failed to fetch books:", response.status);
        }
      };

      const loadFilterData = async () => {
        const response = await axios.get("http://localhost:8080/book/filter", {
            validateFilterStatus: (filterStatus) => filterStatus === 200 || filterStatus === 302,
        });
        if (response.status === 200 || response.status === 302) {
            setFilterOptions(response.data);
        } else {
            console.error("Failed to fetch filter options:", response.status);
        }
      }

      const handleSelectedOption = (event) => {
        setSelectedFilter(event.target.value)
      }

      return (
        <div>
            <label htmlFor="dropdown">Filter by Category:</label>
            <select id="dropdown" value={selectedValue} onChange={handleSelectChange}>
                <option value="">All Categories</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <p>Selected value: {selectedValue}</p>
        </div>
    );
  }
  
  export default FilterBooks;