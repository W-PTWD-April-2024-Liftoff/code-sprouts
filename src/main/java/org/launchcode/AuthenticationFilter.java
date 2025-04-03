//package org.launchcode;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import jakarta.servlet.http.HttpSession;
//import org.launchcode.controllers.AuthenticationController;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.launchcode.models.User;
//import org.springframework.web.servlet.HandlerInterceptor;
//
//import java.io.IOException;
//import java.util.Arrays;
//import java.util.List;
//
//public class AuthenticationFilter implements HandlerInterceptor { //implements interface to do override prehandle
//
//    @Autowired
//    AuthenticationController authenticationController;
//
//    //create whitelist
//    private static final List<String> whitelist = Arrays.asList("/api", "/logout", "/login", "/register", "/css");
//
//    private static boolean isWhitelisted(String path) {
//        for (String pathRoot : whitelist) {
//            if (path.startsWith(pathRoot)) {
//                return true;
//            }
//        }
//        return false;
//    }
//    //use the request and response to route to the log in page if they are not in session
//    @Override //override prehandlers
//    public boolean preHandle(HttpServletRequest request,
//                             HttpServletResponse response,
//                             Object handler) throws IOException {
//        if (isWhitelisted(request.getRequestURI())) {
//            return true;
//        }
//        //get session out of the request
//        HttpSession session =request.getSession();
//        //get user out of the session
//        User user = authenticationController.getUserFromSession(session);
//
//        if (user != null) { //they are logged in
//            return true;
//        }
//        response.sendRedirect("/login"); //not logged send to login
//        return false;
//    }
//}
