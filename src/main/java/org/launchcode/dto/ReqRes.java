package org.launchcode.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.launchcode.entity.OurUsers;

import java.util.List;
//sets the fields for ReqRes class for registering and loggin in, passed in for user to be logged in or register
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    private String city;
    private String role;
    private String email;
    private String password;
    private OurUsers ourUsers;
    private List<OurUsers> ourUsersList;

    public int getStatusCode() {
        return statusCode;
    } //for response success 200, bad route 400, 403 unauth, 500 server
}
