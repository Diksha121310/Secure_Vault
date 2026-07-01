package com.securevault.backend.security;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;

@Component
public class LoginRateLimiter {

    private final Map<String, Bucket> buckets =
            new ConcurrentHashMap<>();

    private Bucket newBucket() {

        Bandwidth limit =
                Bandwidth.builder()
                        .capacity(5)
                        .refillGreedy(
                                5,
                                Duration.ofMinutes(15)
                        )
                        .build();

        return Bucket.builder()
                .addLimit(limit)
                .build();
    }

    public boolean allowRequest(String key) {

        Bucket bucket =
                buckets.computeIfAbsent(
                        key,
                        k -> newBucket()
                );

        return bucket.tryConsume(1);
    }
}