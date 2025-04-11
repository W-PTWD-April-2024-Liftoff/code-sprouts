package org.example.controllers;

import jakarta.servlet.http.HttpSession;
import org.example.models.User;
import org.example.models.data.UserRepository;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Controller
public class AuthenticationController {

    UserRepository userRepository;

    private static final String userSessionKey = "user";

    private static void setUserSessionKey(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());

    }

    public User getUserFromSession(HttpSession session) {

        Integer userId = (Integer) session.getAttribute(userSessionKey);

        if (userId == null) {
            return null;
        }

        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isEmpty()) {
            return null;
        }
        return userOptional.get();
    }

}