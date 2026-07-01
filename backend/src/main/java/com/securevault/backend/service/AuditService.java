package com.securevault.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.securevault.backend.model.AuditLog;
import com.securevault.backend.repository.AuditLogRepository;

@Service
public class AuditService {

    @Autowired
    private AuditLogRepository repository;

    public void log(
            String email,
            String action
    ) {

        repository.save(
                new AuditLog(
                        email,
                        action
                )
        );
    }
}