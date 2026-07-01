package com.securevault.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.securevault.backend.model.AuditLog;

public interface AuditLogRepository
        extends MongoRepository<AuditLog, String> {
}