package me.cyper.fsd.lab05.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import me.cyper.fsd.lab05.entity.User;
import me.cyper.fsd.lab05.service.UserService;

@Controller
public class HomeController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ModelAndView homeInit(Locale locale, Model model) {

        ModelAndView mv = new ModelAndView("home");

        List<User> users = userService.findAllUsers();
        mv.addObject("users", users);

        return mv;
    }
}