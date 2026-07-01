package com.securevault.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.securevault.backend.model.Activity;

public interface ActivityRepository
        extends MongoRepository<Activity, String> {

    List<Activity> findTop10ByUserEmailOrderByCreatedAtDesc(String userEmail);

}