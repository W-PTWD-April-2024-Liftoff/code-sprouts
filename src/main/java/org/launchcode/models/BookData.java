package org.launchcode.models;

import org.launchcode.models.Book;
import java.util.ArrayList;
import java.util.List;

public class BookData {
    public static List<Book> findBook(String bookName, Iterable<Book> allBooks) {
        List<Book> booksFound = new ArrayList<>();
        for (Book book : allBooks) {
            if (book.getBookName().toLowerCase().contains(bookName.toLowerCase())) {
                booksFound.add(book);
            }
        }
        return booksFound;
    }

    private String category;
    private String rating;
}