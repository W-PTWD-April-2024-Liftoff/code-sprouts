package org.launchcode.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity
public class BookDetails extends AbstractEntity {

    @NotBlank(message = "Rating is required, please enter a number 1 - 5")
    private int rating;

    @NotBlank(message = "Description is required.")
    @Size(max = 1000, message = "Description can be no more than 1000 characters.")
    private String description;

    @ManyToMany(mappedBy = "bookDetails")
    private List<Book> books;

    public BookDetails(){};

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

    public List<Book> getBooks() {
        return books;
    }
}
