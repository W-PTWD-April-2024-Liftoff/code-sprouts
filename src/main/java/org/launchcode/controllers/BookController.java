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
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<OurUsers> optionalUser = ourUsersRepository.findByEmail(currentUserEmail);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Authenticated user not found");
        }
        OurUsers user = optionalUser.get();
        Optional<Book> oldbook = bookRepository.findById(id);
        if (oldbook.isPresent()) {
            Book bookToUpdate = oldbook.get();
            if (newBook.getBookName() != null && !newBook.getBookName().isEmpty()) {
                bookToUpdate.setBookName(newBook.getBookName());
            }
            if (newBook.getCategory() != null && !newBook.getCategory().isEmpty()) {
                bookToUpdate.setCategory(newBook.getCategory());
            }
            if (newBook.getAuthor() != null && !newBook.getAuthor().isEmpty()) {
                bookToUpdate.setAuthor(newBook.getAuthor());
            }
            if (newBook.getDescription() != null && !newBook.getDescription().isEmpty()) {
                bookToUpdate.setDescription(newBook.getDescription());
            }
            if(newBook.getRating() > 0) {
                bookToUpdate.setRating(newBook.getRating());
            }
            if(newBook.getNotes() != null && !newBook.getNotes().isEmpty()) {
                bookToUpdate.setNotes(newBook.getNotes());
            }
            if(newBook.getCustomTag() != null && !newBook.getCustomTag().isEmpty()) {
                bookToUpdate.setCustomTag(newBook.getCustomTag());
            }
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
            book.setCategory(item.getVolumeInfo().getCategories() != null ?
                    String.join(", ", item.getVolumeInfo().getCategories()) : "Unknown Category");
            book.setDescription(item.getVolumeInfo().getDescription() != null ?
                    item.getVolumeInfo().getDescription() : "Unknown Description");

            String description = book.getDescription();
            if (description.length() > 1000) {
               description = description.substring(0, 1000) + "...";
                }
                book.setDescription(description);

            return book;
        }).toList();
    }

    @GetMapping("/book/filter")
    public List<Book> getFilteredBooks(@RequestParam(required = false) String category,
                                       @RequestParam(required = false) Integer rating,
                                       @RequestParam(required = false) String customTag) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<OurUsers> optionalUser = ourUsersRepository.findByEmail(currentUserEmail);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Authenticated user not found");
        }
        OurUsers user = optionalUser.get();
        if (category != null && rating != null) {
            return bookRepository.findByUserIdAndCategoryAndRating(user.getId(), category, rating);
        } else if (category != null) {
            return bookRepository.findByUserIdAndCategory(user.getId(), category);
        } else if (rating != null) {
            return bookRepository.findByUserIdAndRating(user.getId(), rating);
        } else if (customTag != null) {
            return bookRepository.findByUserIdAndCustomTag(user.getId(), customTag);
        } else if (customTag != null && rating != null) {
            return bookRepository.findByUserIdAndRatingAndCustomTag(user.getId(), rating, customTag);
        } else if (customTag != null && category != null) {
            return bookRepository.findByUserIdAndCategoryAndCustomTag(user.getId(), category, customTag);
        } else if (customTag != null && rating != null && category != null) {
            return bookRepository.findByUserIdAndCategoryAndRatingAndCustomTag(user.getId(), customTag, rating, category);
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

    @GetMapping("/book/customTags")
    public List<String> getCustomTags() {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<OurUsers> optionalUser = ourUsersRepository.findByEmail(currentUserEmail);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Authenticated user not found");
        }
        OurUsers user = optionalUser.get();
        return bookRepository.findCustomTagsByUserId(user.getId());
    }
    @PostMapping("/book/{bookId}/rate")
    public String rateBook(@PathVariable int bookId, @RequestParam int rating) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<OurUsers> optionalUser = ourUsersRepository.findByEmail(currentUserEmail);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Authenticated user not found");
        }
        OurUsers user = optionalUser.get();

        if (rating < 1 || rating > 5) {
            return "Rating must be between 1 - 5";
        }
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));

        if(!book.isRead()) {
            return "Must mark book as read to rate";
        }
        book.setRating(rating);
        bookRepository.save(book);

        return "Rating saved successfully";
    }

    @PostMapping("/book/saveFromGoogleBooks")
    public Book saveFromGoogleBooks(@RequestBody Book book) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<OurUsers> optionalUser = ourUsersRepository.findByEmail(currentUserEmail);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Authenticated user not found");
        }
        OurUsers user = optionalUser.get();
        book.setUser(user);

        if (book.getBookName() == null) book.setBookName("Unknown Book");
        if (book.getAuthor() == null) book.setAuthor("Unknown Author");
        if (book.getCategory() == null) book.setCategory("Unknown Category");
        if (book.getDescription() == null) book.setDescription("");
        if (book.getNotes() == null) book.setNotes("");
        if (book.getCustomTag() == null) book.setCustomTag("");

        return bookRepository.save(book);
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