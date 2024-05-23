package com.wanderdrop.wserver.repository;

import com.wanderdrop.wserver.model.Role;
import com.wanderdrop.wserver.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    User findByRole(Role role);
}