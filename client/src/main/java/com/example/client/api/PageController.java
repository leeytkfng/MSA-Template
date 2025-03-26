package com.example.client.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/register-form")
    public String registerForm() {
        return "register";
    }
}
