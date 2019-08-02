package me.cyper.fsd.lab05.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import me.cyper.fsd.lab05.entity.User;

@Repository
public class UserDao {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    public List<User> findAllUsers(){
        List<User> result = jdbcTemplate.query("select * from tbl_user", new RowMapper<User>() {
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                User o = new User();
                o.setUserId(rs.getInt("user_id"));
                o.setName(rs.getString("name"));
                o.setEmail(rs.getString("email"));
                o.setUsername(rs.getString("username"));
                o.setPassword(rs.getString("password"));
                return o;
            }
        });

        return result;
    }

}
