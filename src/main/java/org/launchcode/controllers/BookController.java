package org.launchcode.controllers;

import org.launchcode.models.Book;
import org.launchcode.models.GoogleBooksResponse;
import org.launchcode.services.GoogleBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.launchcode.models.data.BookRepository;
import org.launchcode.models.BookData;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private GoogleBookService googleBookService;

    @GetMapping("/book")
    public List<Book> getBooks() {
        return (List<Book>) bookRepository.findAll();
    }

    @PostMapping("/book/add")
    public Book addBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }


    @GetMapping("/book/viewById/{id}")
    public Book viewBookById(@PathVariable int id) {
        Optional<Book> optBook = bookRepository.findById(id);
        if (optBook.isPresent()) {
            Book book = (Book) optBook.get();
            return book;
        } else {
            return null;
        }
    }

    @PutMapping("/book/update/{id}")
    public Book updatedBook(@PathVariable int id, @RequestBody Book newBook) {
        Optional<Book> oldbook = bookRepository.findById(id);
        if (oldbook.isPresent()) {
            Book bookToUpdate = oldbook.get();
            bookToUpdate.setBookName(newBook.getBookName());
            bookToUpdate.setCategory(newBook.getCategory());
            bookToUpdate.setAuthor(newBook.getAuthor());
            bookToUpdate.setDescription(newBook.getDescription());
            bookToUpdate.setRating(newBook.getRating());
            return bookRepository.save(bookToUpdate);
        } else {
            return null;
        }
    }

    @GetMapping("/book/search")
    public List<Book> searchBooks(@RequestParam("bookName") String bookName) {
        List<Book> books = BookData.findBook(bookName, bookRepository.findAll());
        if (!books.isEmpty()) {
            books.forEach(book -> book.setSource("BookShelf"));
            return books;
        }
        else {
            GoogleBooksResponse googleBookResponse = googleBookService.searchBooks(bookName);
            if (googleBookResponse != null && googleBookResponse.getItems() != null && !googleBookResponse.getItems().isEmpty()) {
                System.out.println("Google Books API Response: " + googleBookResponse);
                List<Book> apiBooks = convertGoogleBooksToLocalBooks(googleBookResponse);
                apiBooks.forEach(book -> book.setSource("The book you search is not available in bookshelf,similar search from internet"));
                System.out.println("Books from Google: " + apiBooks.size());
                //  return convertGoogleBooksToLocalBooks(googleBookResponse);
                return apiBooks;
            } else {
                System.out.println("No books found from Google for the query: " + bookName);
                return new ArrayList<>();
            }
        }
    }

    private List<Book> convertGoogleBooksToLocalBooks(GoogleBooksResponse googleBooksResponse) {
        return googleBooksResponse.getItems().stream().map(item -> {
            Book book = new Book();
            book.setBookName(item.getVolumeInfo().getTitle());
            book.setAuthor(item.getVolumeInfo().getAuthors() != null ?
                    String.join(", ", item.getVolumeInfo().getAuthors()) : "Unknown Author");
            book.setCategory(item.getVolumeInfo().getDescription());
            return book;
        }).toList();
    }


    @DeleteMapping("/book/delete/{bookidtodelete}")
    public Book deleteBookById(@PathVariable int bookidtodelete) {
        Optional<Book> booktobedeleted = bookRepository.findById(bookidtodelete);
        if (booktobedeleted.isPresent()) {
            bookRepository.deleteById(bookidtodelete);
        }
        return null;
    }
//
 }

