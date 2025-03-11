package org.example.models;

import jakarta.persistence.Entity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class User extends AbstractEntity{

    private String username;

    private String pwHash;

    public User(String username, String password) {
        this.username = username;
        this.pwHash = encoder.encode(password);
    }

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }
}
