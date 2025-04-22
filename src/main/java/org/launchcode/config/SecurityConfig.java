package org.launchcode.config;


import com.mysql.cj.protocol.AuthenticationPlugin;
//import com.mysql.cj.protocol.AuthenticationProvider;
import org.launchcode.service.JWTUtils;
import org.launchcode.service.OurUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//entry point of security class
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private OurUserDetailService ourUserDetailService;
    @Autowired
    private JWTAuthFilter jwtAuthFilter;
//secures certain endpoints while allowing others to be open
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request-> request.requestMatchers("/auth/**", "/public/**").permitAll() //allow register and login on the auth path
                        .requestMatchers("/admin/**").hasAnyAuthority("ADMIN") //signed in with admin
                        .requestMatchers("/user/**").hasAnyAuthority("USER")
                        .requestMatchers("/book").hasAnyAuthority("ADMIN", "USER") //signed in with admin or user
                        .requestMatchers("/book/**").hasAnyAuthority("ADMIN", "USER")
                        .requestMatchers("/adminuser/**").hasAnyAuthority("ADMIN", "USER")
                        .anyRequest().authenticated())
                //no session will remain on server, each request must contain its own token stateless
                .sessionManagement(manager->manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider()).addFilterBefore( //inserts jwtauthfilter before spring default login
                        jwtAuthFilter, UsernamePasswordAuthenticationFilter.class
                );
        return httpSecurity.build();
    }

    //using password encoder and setting userdetailservice
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(ourUserDetailService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    //encodes password by hashing with BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    //enable login function for auth/login path
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws
            Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

}





