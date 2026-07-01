package com.securevault.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public String test(HttpServletRequest request) {

        String email =
                (String) request.getAttribute("email");

        return "Authenticated user: " + email;
    }
}