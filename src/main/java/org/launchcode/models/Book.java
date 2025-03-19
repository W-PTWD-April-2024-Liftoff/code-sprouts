package org.launchcode.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Book extends AbstractEntity {

    @NotBlank(message = "Book name is required.")
    private String bookName;

    @NotBlank(message = "Author is required.")
    private String author;

    private String category;

    @OneToMany
    private List<BookDetails> bookDetails = new ArrayList<>();

    public Book() {};

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
}
