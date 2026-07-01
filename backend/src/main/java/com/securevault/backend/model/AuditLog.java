package com.securevault.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "audit_logs")
public class AuditLog {

    @Id
    private String id;

    private String email;

    private String action;

    private LocalDateTime timestamp;

    public AuditLog() {}

    public AuditLog(
            String email,
            String action
    ) {
        this.email = email;
        this.action = action;
        this.timestamp = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(
            LocalDateTime timestamp
    ) {
        this.timestamp = timestamp;
    }
}