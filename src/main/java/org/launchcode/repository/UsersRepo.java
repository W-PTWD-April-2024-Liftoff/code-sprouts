package org.launchcode.repository;


import org.launchcode.entity.OurUsers;
import org.launchcode.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository

public interface UsersRepo extends CrudRepository<OurUsers, Integer> {

    //custom query method find user in database
    Optional<OurUsers> findByEmail(String email);
}



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
