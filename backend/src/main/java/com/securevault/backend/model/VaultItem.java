package com.securevault.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vault")
public class VaultItem {

    @Id
    private String id;

    private String userEmail;
    private String title;

    // this will ALWAYS store encrypted text in DB
    private String encryptedData;
    private String type;
    
    private LocalDateTime createdAt;

    private String fileName;

    private String fileType;

    private String encryptedFile;

    public VaultItem() {}

    public VaultItem(String userEmail, String title, String encryptedData) {
        this.userEmail = userEmail;
        this.title = title;
        this.encryptedData = encryptedData;
    }

    public String getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEncryptedData() {
        return encryptedData;
    }

    public void setEncryptedData(String encryptedData) {
        this.encryptedData = encryptedData;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getEncryptedFile() {
        return encryptedFile;
    }

    public void setEncryptedFile(String encryptedFile) {
        this.encryptedFile = encryptedFile;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}