package me.cyper.fsd.lab06;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import me.cyper.fsd.lab06.entity.User;
import me.cyper.fsd.lab06.service.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CourseAppApplicationTests {
    
    @Autowired
    private UserService userService;

	@Test
	public void contextLoads() {
	    User user = new User();
	    user.setName("df");
	    user.setEmail("xxx@xx.com");
	    user.setUsername("xx");
	    user.setPassword("dfd");
	    user.setAdmin(true);
	    
	    userService.saveUser(user);
	    
	    System.out.println(user.getUserId());
	    List<User> users = userService.findAllUsers();
	    assertEquals(1, users.size());
	}

}
