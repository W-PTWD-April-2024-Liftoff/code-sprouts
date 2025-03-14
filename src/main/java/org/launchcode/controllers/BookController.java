package org.launchcode.controllers;

import org.launchcode.models.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.launchcode.models.data.BookRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @PostMapping("/books/add")
    public Book addBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }
    @GetMapping("/books")
    public List<Book> getBooks() {
        return (List<Book>) bookRepository.findAll();
    }

    @GetMapping("/books/viewbyid/{id}")
    public Book viewBookById(@PathVariable int id) {
        Optional<Book> optBook = bookRepository.findById(id);
        if (optBook.isPresent()) {
            Book book = (Book) optBook.get();
            return book;
        } else {
            return null;
        }
    }

    @PutMapping("/books/update/{id}")
    public Book updatedBook(@PathVariable int id, @RequestBody Book booktochange) {
        Optional<Book> oldbook = bookRepository.findById(id);
        if (oldbook.isPresent()) {
            booktochange.setBookName(booktochange.getBookName());
            booktochange.setCategory(booktochange.getCategory());
            booktochange.setAuthor(booktochange.getAuthor());
            return bookRepository.save(booktochange);
        } else {
            return null;
        }
    }
    @DeleteMapping("/books/delete/{bookidtodelete}")
    public Book deleteBookById(@PathVariable int bookidtodelete) {
        Optional<Book> booktobedeleted = bookRepository.findById(bookidtodelete);
        if (booktobedeleted.isPresent()) {
            bookRepository.deleteById(bookidtodelete);
        }
        return null;
    }
}


