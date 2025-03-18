package org.launchcode.models;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Book extends AbstractEntity {

    @NotBlank(message = "Book name is required.")
    private String bookName;

    @NotBlank(message = "Author is required.")
    private String author;

    private String category;

    private int rating;

    @NotBlank(message = "Description is required.")
    @Size(max = 1000, message = "Description can be no more than 1000 characters,")
    private String description;

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
