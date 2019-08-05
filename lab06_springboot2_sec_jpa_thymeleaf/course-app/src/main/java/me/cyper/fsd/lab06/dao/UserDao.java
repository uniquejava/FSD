package me.cyper.fsd.lab06.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import me.cyper.fsd.lab06.entity.User;

@Repository
public interface UserDao extends JpaRepository<User, String> {
    public User findByUsername(String username);
}
