package org.launchcode.models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.launchcode.entity.OurUsers;

import java.util.List;

// declares book class
@Getter
@Setter
@Entity
public class Book extends AbstractEntity {

    private String bookName;

    private String author;

    private String category;

    private String source;

    private int rating;

    private boolean isRead;

    private String description;

    //Many books to one user relationship
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private OurUsers user;

    private String notes;

    private String customTag;

    //prints string representation of class to be sent to, used by front end or other locations (postman or console)
    @Override
    public String toString(){
        return "Book{" +
                "bookName='" + bookName + '\'' +
                ", author='" + author + '\'' +
                ", category='" + category + '\'' +
                ", source='" + source + '\'' +
                ", isRead=" + isRead + '\'' +
                ", rating=" + rating + '\'' +
                ", description='" + description + '\'' +
                ", notes='" + notes + '\'' +
                ", customTag='" + customTag + '\'' +
                '}';
    }
}