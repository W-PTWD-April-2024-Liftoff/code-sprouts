package org.launchcode.models.data;

import org.launchcode.models.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book,Integer> {

    List<Book> findBookByUserId(Integer userId);
    List<Book> findByUserIdAndCategoryAndRating(Integer userId, String category, int rating);
    List<Book> findByUserIdAndCategory(Integer userId, String category);
    List<Book> findByUserIdAndRating(Integer userId, int rating);
}
