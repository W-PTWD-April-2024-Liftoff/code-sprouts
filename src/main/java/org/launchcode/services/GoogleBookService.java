package org. launchcode.services;
import org. launchcode.models. GoogleBooksResponse;
import org.launchcode.models.GoogleBooksResponse;
import org.springframework.beans.factory.annotation.Value;
import org. springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.sql.SQLOutput;

//uses api key referenced from app properties to access google books for search
@Service
public class GoogleBookService {
    private final RestTemplate restTemplate;

    @Value("${google.api.key}")
    private String googleApiKey;

    public GoogleBookService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public GoogleBooksResponse searchBooks(String bookName) {
        try {
            String url = "https://www.googleapis.com/books/v1/volumes?q=" +
                    bookName + "&key=" + googleApiKey;
            ResponseEntity<GoogleBooksResponse> response =
                    restTemplate.getForEntity(url, GoogleBooksResponse.class);
            return response.getBody();
        }
        catch (HttpClientErrorException e)
        {
            System.out.println("Error Calling in API" + e.getMessage());
            return null;
        }
    }

}