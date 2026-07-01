package com.securevault.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.securevault.backend.dto.SecurityOverviewResponse;
import com.securevault.backend.service.SecurityOverviewService;

@RestController
@RequestMapping("/api/security")
public class SecurityOverviewController {

    @Autowired
    private SecurityOverviewService securityOverviewService;

    @GetMapping("/overview")
    public SecurityOverviewResponse getOverview() {

        return securityOverviewService.getOverview();

    }

}