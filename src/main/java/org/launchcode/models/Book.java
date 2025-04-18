package org.launchcode.models;
import jakarta.persistence.Entity;


@Entity
public class Book extends AbstractEntity {

    private String bookName;

    private String source;
    private String author;

    private String category;

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

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
