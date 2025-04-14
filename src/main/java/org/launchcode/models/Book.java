package org.launchcode.models;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import org.launchcode.entity.OurUsers;
import java.util.List;



@Data
@Entity
public class Book extends AbstractEntity {

    private String bookName;

    private String author;

    private String category;

    @ManyToMany(mappedBy = "bookList")
    private List<OurUsers> readers;

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    private String source;

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
