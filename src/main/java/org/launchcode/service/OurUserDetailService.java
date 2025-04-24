package org.launchcode.service;

import org.launchcode.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//custom class implementing spring securities interface called userdetails service which provide loaduserbyusername
@Service
public class OurUserDetailService implements UserDetailsService {

    @Autowired
    private UsersRepo usersRepo;
 //used in JWTAuthFilter class to extract user details based on the username
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usersRepo.findByEmail(username).orElseThrow();
    }
}
