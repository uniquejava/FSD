package me.cyper.fsd.lab05.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import me.cyper.fsd.lab05.entity.User;

@Repository
public class UserDao {
    final static Logger logger = LoggerFactory.getLogger(UserDao.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<User> findAllUsers() {
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

    public User findByUsername(String username) {
        String sql = "select * from tbl_user where username=?";
        
        if (logger.isDebugEnabled()) {
            logger.debug("sql: {}", sql);
            logger.debug("data: {}", username);
        }
        
        User result = jdbcTemplate.query(sql, new ResultSetExtractor<User>() {
            public User extractData(ResultSet rs) throws SQLException {
                if (rs.next()) {
                    User o = new User();
                    o.setUserId(rs.getInt("user_id"));
                    o.setName(rs.getString("name"));
                    o.setEmail(rs.getString("email"));
                    o.setUsername(rs.getString("username"));
                    o.setPassword(rs.getString("password"));
                    return o;
                }

                return null;
            }
        }, username);

        return result;
    }

    public User saveUser(User user) {
        String sql = "insert into tbl_user(name,email,username,password) values (?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        
        if (logger.isDebugEnabled()) {
            logger.debug("sql: {}", sql);
            logger.debug("data: {}", user);
        }
        
        jdbcTemplate.update(new PreparedStatementCreator() {

            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                PreparedStatement ps = con.prepareStatement(sql);
                ps.setString(1, user.getName());
                ps.setString(2, user.getEmail());
                ps.setString(3, user.getUsername());
                ps.setString(4, user.getPassword());
                return ps;
            }
        }, keyHolder);

//      user.setUserId(keyHolder.getKeys().intValue());
        if (logger.isDebugEnabled()) {
            logger.debug("keyholder: {}", keyHolder.getKeys());
        }

        return user;

    }

    public void updateUser(User user) {
        String sql = "update tbl_user set name=?,email=?,username=?,password=? where user_id=?";

        if (logger.isDebugEnabled()) {
            logger.debug("sql: {}", sql);
            logger.debug("data: {}", user);
        }

        List<Object> params = new ArrayList<>();
        params.add(user.getName());
        params.add(user.getEmail());
        params.add(user.getUsername());
        params.add(user.getPassword());
        params.add(user.getUserId());

        jdbcTemplate.update(sql, params.toArray());

    }

}
