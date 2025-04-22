package org.launchcode.repository;


import org.launchcode.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsersRepo extends JpaRepository<OurUsers, Integer> {//coming from hibernate allowing predefined methods queries

    //custom query method find user in database
    Optional<OurUsers> findByEmail(String email);
}

