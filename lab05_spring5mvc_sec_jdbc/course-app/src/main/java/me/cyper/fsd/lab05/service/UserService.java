package me.cyper.fsd.lab05.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import me.cyper.fsd.lab05.dao.UserDao;
import me.cyper.fsd.lab05.entity.User;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserDao userDao;

    public List<User> findAllUsers() {
        return userDao.findAllUsers();
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
        GrantedAuthority roleAdmin = new SimpleGrantedAuthority("ROLE_ADMIN");
        Collection<GrantedAuthority> grantedAuths = Arrays.asList(roleUser, roleAdmin);
        return new org.springframework.security.core.userdetails.User(username, user.getPassword(), grantedAuths);

    }

    public User saveUser(User user) {
        return userDao.saveUser(user);
    }

    public void updateUser(User user) {
        userDao.updateUser(user);
    }
}
