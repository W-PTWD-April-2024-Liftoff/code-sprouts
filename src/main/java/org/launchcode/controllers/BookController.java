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


    @GetMapping("/book")
    public List<Book> getBooks() {
        return (List<Book>) bookRepository.findAll();
    }

    @PostMapping("/book/add")
    public Book addBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }


    @GetMapping("/boo/viewById/{id}")
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
            return bookRepository.save(bookToUpdate);
        } else {
            return null;
        }
    }
    @DeleteMapping("/book/delete/{bookidtodelete}")
    public Book deleteBookById(@PathVariable int bookidtodelete) {
        Optional<Book> booktobedeleted = bookRepository.findById(bookidtodelete);
        if (booktobedeleted.isPresent()) {
            bookRepository.deleteById(bookidtodelete);
        }
        return null;
    }
}


