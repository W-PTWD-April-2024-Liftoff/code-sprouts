package org.launchcode.controllers;

import org.launchcode.entity.OurUsers;
import org.launchcode.models.Book;
import org.launchcode.models.GoogleBooksResponse;
import org.launchcode.repository.UsersRepo;
import org.launchcode.services.GoogleBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.launchcode.models.data.BookRepository;
import org.launchcode.models.BookData;

import java.util.ArrayList;
import java.util.Arrays;
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

    @Autowired
    private UsersRepo ourUsersRepository;

    //retrieves list of books based on the associated user by email
    @GetMapping("/book")
    public List<Book> getBooks() {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<OurUsers> optionalUser = ourUsersRepository.findByEmail(currentUserEmail);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Authenticated user not found");
        }
        OurUsers user = optionalUser.get();
        return (List<Book>) bookRepository.findBookByUserId(user.getId());
    }

//    @GetMapping("/book/read")
//    public List<Book> getBooks() {
//        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
//        Optional<OurUsers> optionalUser = ourUsersRepository.findByEmail(currentUserEmail);
//        if (optionalUser.isEmpty()) {
//            throw new RuntimeException("Authenticated user not found");
//        }
//        OurUsers user = optionalUser.get();
//        return (List<Book>) bookRepository.findBookByUserId(user.getId()); //make this say if book.isRead==true
//    }


    @PostMapping("/book/add")
    public Book addBook(@RequestBody Book book) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<OurUsers> optionalUser = ourUsersRepository.findByEmail(currentUserEmail);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Authenticated user not found");
        }
        OurUsers user = optionalUser.get();
        book.setUser(user);
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
            bookToUpdate.setRead(newBook.isRead());
            return bookRepository.save(bookToUpdate);
        } else {
            return null;
        }
    }

    @PutMapping("/book/markasread/{id}")
    public Book markasread(@PathVariable int id) {
        Optional<Book> oldbook = bookRepository.findById(id);
        if (oldbook.isPresent()) {
            Book bookToUpdate = oldbook.get();
            bookToUpdate.setRead(true);
            return bookRepository.save(bookToUpdate);
        } else {
            return null;
        }
    }

    @PutMapping("/book/markasunread/{id}")
    public Book markasunread(@PathVariable int id) {
        Optional<Book> oldbook = bookRepository.findById(id);
        if (oldbook.isPresent()) {
            Book bookToUpdate = oldbook.get();
            bookToUpdate.setRead(false);
            return bookRepository.save(bookToUpdate);
        } else {
            return null;
        }
    }


    //need front end to work
    @GetMapping("/book/search")
    public List<Book> searchBooks(@RequestParam("bookName") String bookName) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<OurUsers> optionalUser = ourUsersRepository.findByEmail(currentUserEmail);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Authenticated user not found");
        }
        OurUsers user = optionalUser.get();
        List<Book> books = BookData.findBook(bookName, bookRepository.findBookByUserId(user.getId()));
        if (!books.isEmpty()) {
            books.forEach(book -> book.setSource("BookShelf"));
            return books;
        }
        else { //searches the GoogleBooks API to search for term
            GoogleBooksResponse googleBookResponse = googleBookService.searchBooks(bookName);
            if (googleBookResponse != null && googleBookResponse.getItems() != null && !googleBookResponse.getItems().isEmpty()) {
                System.out.println("Google Books API Response: " + googleBookResponse);
                List<Book> apiBooks = convertGoogleBooksToLocalBooks(googleBookResponse);
                apiBooks.forEach(book -> book.setSource("The book you searched is not available in your bookshelf. Here are similar results from GoogleBooks"));
                System.out.println("Books from Google: " + apiBooks.size());
// return convertGoogleBooksToLocalBooks(googleBookResponse);
                return apiBooks;
            } else {
                System.out.println("No books found from Google for the query: " + bookName);
                return new ArrayList<>();
            }
        }
    }
//needs converts book into local book to save in database by setting the fields with appropriate info
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

    @GetMapping("/book/filter")
    public List<Book> getFilteredBooks(@RequestParam(required = false) String category,
                                       @RequestParam(required = false) Integer rating) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<OurUsers> optionalUser = ourUsersRepository.findByEmail(currentUserEmail);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Authenticated user not found");
        }
        OurUsers user = optionalUser.get();
        if (category != null && rating != null) {
            return bookRepository.findByUserIdAndCategoryAndRating(user.getId(), category, rating);
//        } else if (rating != null && read != null) {
//            return bookRepository.findByRatingAndRead(rating, read);
//        } else if (read != null) {
//            return bookRepository.findByRead(read);
        } else if (category != null) {
            return bookRepository.findByUserIdAndCategory(user.getId(), category);
        } else if (rating != null) {
            return bookRepository.findByUserIdAndRating(user.getId(), rating);
        }
        return bookRepository.findBookByUserId(user.getId());
    };

    @GetMapping("/book/categories")
    public List<String> getCategories() {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<OurUsers> optionalUser = ourUsersRepository.findByEmail(currentUserEmail);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Authenticated user not found");
        }
        OurUsers user = optionalUser.get();
        return bookRepository.findCategoryByUserId(user.getId());
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