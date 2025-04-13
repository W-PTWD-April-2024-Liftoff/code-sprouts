package org.launchcode.controllers;

import org.launchcode.models.BookDetails;
import org.launchcode.models.data.BookDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class BookDetailsController {

    @Autowired
    private BookDetailsRepository bookDetailsRepository;

    @PostMapping("/bookDetails/add")
    public BookDetails addBookDetails(@RequestBody BookDetails bookDetails) {
        return bookDetailsRepository.save(bookDetails);
    }
    @GetMapping("/bookDetails")
    public List<BookDetails> getBookDetails() {
        return (List<BookDetails>) bookDetailsRepository.findAll();
    }

    @GetMapping("/bookDetails/viewbyid/{id}")
    public BookDetails viewBookById(@PathVariable int id) {
        Optional<BookDetails> optBookDetails = bookDetailsRepository.findById(id);
        if (optBookDetails.isPresent()) {
            BookDetails bookDetails = (BookDetails) optBookDetails.get();
            return bookDetails;
        } else {
            return null;
        }
    }

    @PutMapping("/bookDetails/update/{id}")
    public BookDetails updatedBookDetails(@PathVariable int id, @RequestBody BookDetails bookdetailstochange) {
        Optional<BookDetails> oldbookdetails = bookDetailsRepository.findById(id);
        if (oldbookdetails.isPresent()) {
            bookdetailstochange.setDescription(bookdetailstochange.getDescription());
            bookdetailstochange.setRating(bookdetailstochange.getRating());
            return bookDetailsRepository.save(bookdetailstochange);
        } else {
            return null;
        }
    }
    @DeleteMapping("/bookDetails/delete/{bookdetailidtodelete}")
    public BookDetails deleteBookDetailsById(@PathVariable int bookdetailsidtodelete) {
        Optional<BookDetails> bookdetailstobedeleted = bookDetailsRepository.findById(bookdetailsidtodelete);
        if (bookdetailstobedeleted.isPresent()) {
            bookDetailsRepository.deleteById(bookdetailsidtodelete);
        }
        return null;
    }


}
