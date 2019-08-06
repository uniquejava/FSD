package me.cyper.fsd.lab06.config;

import javax.servlet.Filter;

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
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import me.cyper.fsd.lab06.security.KaptchaAuthenticationFilter;
import me.cyper.fsd.lab06.service.UserService;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;

    @SuppressWarnings("deprecation")
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
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

        // 允许来自同一来源的H2 控制台的请求
        http.headers().frameOptions().sameOrigin();

        // @formatter:off

        http
            .authorizeRequests()
            
                // Common locations for static resources.
                // This line is invalid, see https://stackoverflow.com/a/32056323/2497876
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
                
                .antMatchers("/","/captcha_image**", "/h2/**").permitAll()
                .antMatchers("/admin/**").hasAnyRole("ADMIN")
                .antMatchers("/user/**").hasAnyRole("USER")

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

                // we need to instruct Spring Security to allow anyone to access the /login URL
                .permitAll()

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
