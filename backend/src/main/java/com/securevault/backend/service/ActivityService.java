package com.securevault.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.securevault.backend.model.Activity;
import com.securevault.backend.repository.ActivityRepository;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public void log(String email,
                    String title,
                    String description) {

        Activity activity =
                new Activity(
                        email,
                        title,
                        description,
                        LocalDateTime.now()
                );

        activityRepository.save(activity);
    }

    public List<Activity> getRecentActivities(String email) {
        return activityRepository
            .findTop10ByUserEmailOrderByCreatedAtDesc(email);
    }
}