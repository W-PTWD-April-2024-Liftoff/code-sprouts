package org.launchcode.models.data;


import org.launchcode.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UserRepository extends CrudRepository<User, Integer> {

    //custom query method find user in database
    User findByUsername(String username);
}
