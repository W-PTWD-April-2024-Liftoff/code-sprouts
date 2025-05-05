import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const SaveFromApi = ({show, onHide, bookData}) => {
    const handleSave = async () => {
        const token = localStorage.getItem("token");

        try {
            await axios.post("http://localhost:8080/book/saveFromGoogleBooks", bookData, {
                headers: {Authorization: `Bearer ${token}`},
            });
            alert("Book saved successfully");
            onHide();
        } catch (error) {
            console.error("failed to save book:", error);
        }
    };

    if (!bookData) return null;

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Save</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Title: {bookData.bookName} </p>
                    <p>Author: {bookData.author} </p>
                    <p>Category: {bookData.category}</p>
                    <p>Description: {bookData.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Book
                    </Button>
                </Modal.Footer>
        </Modal>
    )
}

export default SaveFromApi;