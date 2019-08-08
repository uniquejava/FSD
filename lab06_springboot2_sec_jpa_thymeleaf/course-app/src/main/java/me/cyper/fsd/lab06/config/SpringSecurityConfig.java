package me.cyper.fsd.lab06.config;

import javax.servlet.Filter;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import me.cyper.fsd.lab06.security.KaptchaAuthenticationFilter;
import me.cyper.fsd.lab06.service.UserService;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;
    
    @Autowired
    private DataSource dataSource;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    public PersistentTokenRepository persistentTokenRepository() {
        JdbcTokenRepositoryImpl tokenRepository = new JdbcTokenRepositoryImpl();
        tokenRepository.setDataSource(dataSource);
        tokenRepository.setCreateTableOnStartup(false);
        return tokenRepository;
       
    }
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        // Allows adding RequestMatcher instances that should that Spring Security should ignore.
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        Filter filter = new KaptchaAuthenticationFilter("/login", "/login?error");
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

        //allow same origin request from h2 console
        http.headers().frameOptions().sameOrigin();

        // http.csrf().disable();
        
        // @formatter:off

        http
            .authorizeRequests()
            
                // Common locations for static resources.
                // This line is invalid, see https://stackoverflow.com/a/32056323/2497876
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                
                .antMatchers("/","/register", "/captcha_image**", "/h2/**").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/user/**").hasRole("USER")

                // The order matters here, you must put anyRequest at the end.
                // every request requires the user to be authenticated
                .anyRequest().authenticated()

                .and()

                // form based authentication is supported
                .formLogin()

                // when authentication is required, redirect the browser to /login
                // we are in charge of rendering the login page when /login is requested
                // when authentication attempt fails, redirect the browser to /login?error (since we have not specified otherwise)
                // we are in charge of rendering a failure page when /login?error is requested
                // when we successfully logout, redirect the browser to /login?logout (since we have not specified otherwise)
                // we are in charge of rendering a logout confirmation page when /login?logout is requested
                .loginPage("/login")
                .defaultSuccessUrl("/", true)

                // we need to instruct Spring Security to allow anyone to access the /login URL
                .permitAll()
                
                .and()
                
                // remember me
                .rememberMe()
                .tokenRepository(persistentTokenRepository())
                .tokenValiditySeconds(3600 * 24)
                .userDetailsService(userService)
        
                .and()

                // logout().permitAll() allows any user to request logout and view logout success URL.
                .logout().permitAll();

        // @formatter:on
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        // @formatter:off
	    auth.userDetailsService(userService);
        auth.authenticationProvider(authenticationProvider());
        // @formatter:on
    }
}
