import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const SaveFromApi = ({show, onHide, bookData}) => {
    const [notes, setNotes] = useState("");
    const [customTag, setCustomTag] = useState("");
    
    useEffect(() => {
        if (bookData) {
            setNotes(bookData.notes || "");
            setCustomTag(bookData.customTag || "");
        }
    }, [bookData]);

    

    const handleSave = async () => {
        const token = localStorage.getItem("token");

        const bookToSave = {
            ...bookData,
            notes,
            customTag
        }

        try {
            await axios.post("http://localhost:8080/book/saveFromGoogleBooks", bookToSave, {
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
                    <Form.Group className="mb-3">
                    <Form.Label>Person Notes</Form.Label>
                    <Form.Control
                    as="textarea"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add a personal note about the book"
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Custom Tag</Form.Label>
                        <Form.Control
                        type="text"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        placeholder="Ex: Recommended, Favorite, etc"
                        />
                    </Form.Group>
                    
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