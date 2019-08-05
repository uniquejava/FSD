package me.cyper.fsd.lab05.controller;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import me.cyper.fsd.lab05.entity.User;
import me.cyper.fsd.lab05.service.UserService;
import me.cyper.fsd.lab05.util.Result;

@Controller
@RequestMapping("/user")
public class UserController extends BaseController {
    final static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/account")
    public String preUpdateAccount(Model model) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userService.findByUsername(username);

        model.addAttribute("user", user);

        return "user/account_edit";
    }

    @PutMapping("/account")
    @ResponseBody
    public Result updateAccount(@RequestParam(name = "kaptcha", required = true) String kaptcha,
            @Valid @RequestBody User user, HttpSession session) {

        checkCaptcha(kaptcha, session);

        userService.updateUser(user);

        return Result.OK;
    }

    @GetMapping("/tutorials")
    public String listTutorials(Model model) {
        model.addAttribute("activeLink", "tutorials");

        return "user/tutorials";
    }

}