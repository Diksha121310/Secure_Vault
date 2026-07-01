package com.securevault.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.securevault.backend.model.VaultItem;

import java.util.Optional;

public interface VaultRepository extends MongoRepository<VaultItem, String> {

    List<VaultItem> findByUserEmail(String userEmail);

    List<VaultItem> findByUserEmailAndEncryptedFileIsNotNull(
        String userEmail
    );

    Optional<VaultItem> findByIdAndUserEmail(
        String id,
        String userEmail
    );

    long countByUserEmail(String userEmail);

    long countByUserEmailAndEncryptedFileIsNotNull(String userEmail);

    long countByUserEmailAndType(String userEmail, String type);
}