package me.cyper.fsd.lab05.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import me.cyper.fsd.lab05.entity.User;
import me.cyper.fsd.lab05.service.UserService;

@Controller
public class HomeController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ModelAndView homeInit() {

        ModelAndView mv = new ModelAndView("home");

        List<User> users = userService.findAllUsers();
        mv.addObject("users", users);

        return mv;
    }
    
    @GetMapping("/admin/users")
    public ModelAndView users() {
        
        ModelAndView mv = new ModelAndView("admin/users");
        
        List<User> users = userService.findAllUsers();
        mv.addObject("users", users);
        
        return mv;
    }

    @GetMapping(value = "/admin/admin")
    public ModelAndView adminPage() {

        ModelAndView mv = new ModelAndView("admin/admin");
        mv.addObject("title", "Spring Security Hello World");
        mv.addObject("message", "This is protected page!");
        return mv;

    }

}