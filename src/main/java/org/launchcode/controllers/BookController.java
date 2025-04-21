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
            bookToUpdate.setIsRead(newBook.getIsRead());
            return bookRepository.save(bookToUpdate);
        } else {
            return null;
        }
    }

//    @GetMapping("/book/search")
//    public List<Book> searchBooks(@RequestParam("bookName") String bookName) {
//        List<Book> books = BookData.findBook(bookName, bookRepository.findAll());
//        if (!books.isEmpty()) {
//            books.forEach(book -> book.setSource("BookShelf"));
//            return books;
//        }
//        else {
//            GoogleBooksResponse googleBookResponse = googleBookService.searchBooks(bookName);
//            if (googleBookResponse != null && googleBookResponse.getItems() != null && !googleBookResponse.getItems().isEmpty()) {
//                System.out.println("Google Books API Response: " + googleBookResponse);
//                List<Book> apiBooks = convertGoogleBooksToLocalBooks(googleBookResponse);
//                apiBooks.forEach(book -> book.setSource("The book you search is not available in bookshelf,similar search from internet"));
//                System.out.println("Books from Google: " + apiBooks.size());
//// return convertGoogleBooksToLocalBooks(googleBookResponse);
//                return apiBooks;
//            } else {
//                System.out.println("No books found from Google for the query: " + bookName);
//                return new ArrayList<>();
//            }
//        }
//    }
@GetMapping("/book/search")
public List<Book> searchBooks(@RequestParam("bookName") String bookName) {
// Get current authenticated user's email
    String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

// Get the user entity
    Optional<OurUsers> optionalUser = ourUsersRepository.findByEmail(currentUserEmail);
    if (optionalUser.isEmpty()) {
        throw new RuntimeException("Authenticated user not found");
    }

    OurUsers user = optionalUser.get();

// Fetch only the books owned by this user
    List<Book> userBooks = bookRepository.findBookByUserId(user.getId());
// Search within the user's books
    List<Book> books = BookData.findBook(bookName, userBooks);
    if (!books.isEmpty()) {
        books.forEach(book -> book.setSource("BookShelf"));
        return books;
    } else {
// If not found locally, fall back to Google API
        GoogleBooksResponse googleBookResponse = googleBookService.searchBooks(bookName);
        if (googleBookResponse != null && googleBookResponse.getItems() != null && !googleBookResponse.getItems().isEmpty()) {
            List<Book> apiBooks = convertGoogleBooksToLocalBooks(googleBookResponse);
            apiBooks.forEach(book -> book.setSource("The book you search is not available in bookshelf, similar search from internet"));
            return apiBooks;
        } else {
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