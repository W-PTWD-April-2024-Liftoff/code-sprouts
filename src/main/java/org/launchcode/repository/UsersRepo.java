package org.launchcode.repository;


import org.launchcode.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsersRepo extends JpaRepository<OurUsers, Integer> {

    //custom query method find user in database
    Optional<OurUsers> findByEmail(String email);
}

//from class
//
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Repository;
//
//@Repository
//
//public interface UserRepository extends CrudRepository<User, Integer> {
//
//    //custom query method find user in database
//    User findByUsername(String username);
//}


//from tutorial
//package org.launchcode.repository;
//
//import org.launchcode.entity.OurUsers;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.Optional;
//
//public interface UsersRepo extends JpaRepository<OurUsers, Integer> {
//
//    Optional<OurUsers> findByEmail(String email);
//}
