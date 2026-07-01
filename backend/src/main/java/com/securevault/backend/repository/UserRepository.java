package com.securevault.backend.repository;

import com.securevault.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);
    Optional<User> findByResetToken(String resetToken);
}
