package org.launchcode.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.launchcode.entity.OurUsers;

// declares book class
@Getter
@Setter
@Entity
public class Book extends AbstractEntity {

    private String bookName;

    private String author;

    private String category;

    private String source;

    //private String isRead;

    private boolean isRead;

    private int rating;

    @NotBlank(message = "Description is required.")
    @Size(max = 1000, message = "Description can be no more than 1000 characters.")
    private String description;

    //Many books to one user relationship
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private OurUsers user;

    //prints string representation of class to be sent to, used by front end or other locations (postman or console)
    @Override
    public String toString(){
        return "Book{" +
                "bookName='" + bookName + '\'' +
                ", author='" + author + '\'' +
                ", category='" + category + '\'' +
                ", source='" + source + '\'' +
                ", isRead=" + isRead + '\'' +
                ", rating=" + rating +
                ", description='" + description + '\'' +
                '}';
    }
}