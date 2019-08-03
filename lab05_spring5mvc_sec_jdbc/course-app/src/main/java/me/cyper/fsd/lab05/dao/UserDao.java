package me.cyper.fsd.lab05.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import me.cyper.fsd.lab05.entity.User;

@Repository
public class UserDao implements UserDetailsService {

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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String sql = "select * from tbl_user where username=?";
        UserDetails result = jdbcTemplate.query(sql, new ResultSetExtractor<UserDetails>() {
            public UserDetails extractData(ResultSet rs) throws SQLException {
                if (rs.next()) {
                    Collection<GrantedAuthority> grantedAuths = Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
                    String username = rs.getString("username");
                    String password = rs.getString("password");
                    UserDetails user = new org.springframework.security.core.userdetails.User(username, password,
                            grantedAuths);
                    return user;
                }

                return null;
            }
        }, username);

        if (result == null) {
            throw new UsernameNotFoundException("User does not exist.");
        }

        return result;

    }

}
