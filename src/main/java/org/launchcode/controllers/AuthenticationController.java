//package org.launchcode.controllers;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpSession;
//
//import jakarta.validation.Valid;
//import org.launchcode.models.data.UserRepository;
//import org.launchcode.models.User;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//
//import java.util.Optional;
//
//import org.springframework.ui.Model;
//import org.springframework.validation.Errors;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//
//@RestController
//public class AuthenticationController {
//    @Autowired
//    UserRepository userRepository;
//
//    private static final String userSessionKey = "user";
//
//    private static void setUserInSession(HttpSession session, User user) {
//        session.setAttribute(userSessionKey, user.getId());
//
//    }
//
//    public User getUserFromSession(HttpSession session) {
//
//        Integer userId = (Integer) session.getAttribute(userSessionKey);
//
//        if (userId == null) {
//            return null;
//        }
//
//        Optional<User> userOptional = userRepository.findById(userId);
//
//        if (userOptional.isEmpty()) {
//            return null;
//        }
//        return userOptional.get();
//    }
//
//
//    @GetMapping("/register")
//    public String displayRegistrationForm(Model model) {
//        model.addAttribute(new org.launchcode.models.dto.RegistrationFormDTO()); //creates the regformdto variable and pass it to the template register
//        return "register";
//    }
//
//    @PostMapping("/register")
//    public String processRegistrationForm(@ModelAttribute @Valid org.launchcode.models.dto.RegistrationFormDTO registrationFormDTO,
//                                          Errors errors,
//                                          HttpServletRequest request,
//                                          Model model) {//get modelattribute binding for vaildation
//
//        if (errors.hasErrors()) {
//            return "register";
//        }
//        //access the regformdto with getter
//        User existingUser = userRepository.findByUsername(registrationFormDTO.getUsername());
//
//        if (existingUser != null) {
//            errors.rejectValue(
//                    "username",
//                    "username.alreadyExist",
//                    "A user with that username already exists."
//            );
//            return "register";
//        }
//        //send back to for if pwd don't match
//        String password = registrationFormDTO.getPassword();
//        String verifyPassword = registrationFormDTO.getVerifyPassword();
//        if (!password.equals(verifyPassword)) {
//            errors.rejectValue(
//                    "verifyPassword",
//                    "password.mismatch",
//                    "Passwords do not match."
//            );
//            return "register";
//        }
//        //if none above happend, save and create new user, start new session, log them in and go to homepage
//        //creating a new user of the user class,  user class will take getpassword into constructor and hash it,
//        //so when user is saved to the db the password is hashed
//        User newUser = new User(registrationFormDTO.getUsername(), registrationFormDTO.getPassword());
//        userRepository.save(newUser);
//        //now set them in session
//        //same method from above takes a session and a user, uses key user, and gets id
//        setUserInSession(request.getSession(), newUser);
//        return "redirect:/"; //to home page
//    }
//    //handle login data
//    @GetMapping("/login")
//    public String displayLoginForm(Model model) {
//        model.addAttribute(new org.launchcode.models.dto.LoginFormDTO()); //creates the loginformdto variable and pass it to the template login
//        return "login";
//    }
//
//    //login post handler
//    @PostMapping("/login")
//    public String processLoginForm(@ModelAttribute @Valid org.launchcode.models.dto.LoginFormDTO loginFormDTO,
//                                   Errors errors,
//                                   HttpServletRequest request,
//                                   Model model) {//get modelattribute binding for vaildation
//
//        if (errors.hasErrors()) {
//            return "login";
//        }
//        //access the regformdto with getter
//        User existingUser = userRepository.findByUsername(loginFormDTO.getUsername());
//
//        //combine existing and pswd match
//        //get pswd from the form
//        String password = loginFormDTO.getPassword();
//
//        //send user to form if user no exist or pswd no match security through obscurity don't give mucho info
//        if (existingUser == null || !existingUser.isMatchingPassword(password)) {
//            errors.rejectValue(
//                    "password",
//                    "password.invalid",
//                    "Credentials are not valid. Please re-enter username and password."
//            );
//            return "login";
//        }
//
//
//        //for log in will not create new user
//
//        //now set them in session
//        //same method from above takes a session and a user, uses key user, and gets id
//        setUserInSession(request.getSession(), existingUser);
//        return "redirect:/"; //to home page
//    }
//
//    //handle log out .. no tmeplate
//    @GetMapping("/logout")
//    public String logout(HttpServletRequest request) {
//        request.getSession().invalidate(); //we had a valid session in use, no more access
//        return "redirect:/login";
//    }
//}
