package me.cyper.fsd.lab06.service;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import me.cyper.fsd.lab06.dao.UserDao;
import me.cyper.fsd.lab06.entity.User;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserDao userDao;
    
    @Autowired
    private PasswordEncoder encoder;

    public List<User> findAllUsers() {
        return userDao.findAll();
    }

    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User does not exist.");
        }

        GrantedAuthority roleUser = new SimpleGrantedAuthority("ROLE_USER");

        Collection<GrantedAuthority> grantedAuths = new ArrayList<GrantedAuthority>();
        grantedAuths.add(roleUser);

        if (user.isAdmin()) {
            GrantedAuthority roleAdmin = new SimpleGrantedAuthority("ROLE_ADMIN");
            grantedAuths.add(roleAdmin);
        }

        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), grantedAuths);

    }

    public User saveUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userDao.save(user);
    }

    public void updateUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        userDao.save(user);
    }
}
