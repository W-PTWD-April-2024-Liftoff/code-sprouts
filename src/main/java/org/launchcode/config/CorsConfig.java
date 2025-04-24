package org.launchcode.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer(){ //allows Cross Origin resource sharing on all endpoints
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") //share all endpoints
                        .allowedMethods("GET", "POST", "PUT", "DELETE") //allow these actions to the endopint
                        .allowedOrigins("*");
            }
        };
    }
}
