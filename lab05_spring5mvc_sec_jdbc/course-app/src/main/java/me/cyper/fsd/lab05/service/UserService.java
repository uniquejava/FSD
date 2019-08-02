package me.cyper.fsd.lab05.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import me.cyper.fsd.lab05.dao.UserDao;
import me.cyper.fsd.lab05.entity.User;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;
    
    public List<User> findAllUsers(){
      return userDao.findAllUsers();
    }
}
