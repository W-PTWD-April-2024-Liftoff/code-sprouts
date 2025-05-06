//package org.launchcode.models.data;
//
//import org.launchcode.models.Book;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface BookRepository extends CrudRepository<Book,Integer> {
//
//    List<Book> findBookByUserId(Integer userId);
//}
package org.launchcode.models.data;

import org.launchcode.models.Book;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface BookRepository extends CrudRepository<Book,Integer> {

    List<Book> findBookByUserId(Integer userId);
    List<Book> findByUserIdAndCategoryAndRating(Integer userId, String category, int rating);
    List<Book> findByUserIdAndCategory(Integer userId, String category);
    List<Book> findByUserIdAndRating(Integer userId, int rating);

    @Query("SELECT DISTINCT b.category FROM Book b WHERE b.user.id = :userId")
    List<String> findCategoryByUserId(@Param("userId")Integer userId);

    List<Book> findByUserIdAndCustomTag(Integer userId, String customTag);
    List<Book> findByUserIdAndRatingAndCustomTag(Integer userId, int rating, String customTag);
    List<Book> findByUserIdAndCategoryAndCustomTag(Integer userId, String category, String customTag);
    List<Book> findByUserIdAndCategoryAndRatingAndCustomTag(Integer userId, String category, int rating, String customTag);

    @Query("SELECT DISTINCT b.customTag FROM Book b WHERE b.user.id = :userId")
    List<String> findCustomTagsByUserId(@Param("userId")Integer userId);

    List<Book> findBooksByCategoryInOrAuthorIn(Set<String> categories, Set<String> authors);

}