package com.example.client.infrastructure.persistence;

import com.example.client.domain.User;
import com.example.client.domain.UserRepository;
import com.example.client.infrastructure.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class JpaUserRepository implements UserRepository {
    private final SpringDataUserRepository repository;

    public JpaUserRepository(SpringDataUserRepository repository) {
        this.repository = repository;
    }

    @Override
    public User save(User user){
        UserEntity savedEntity = repository.save(UserEntity.fromDomain(user));
        return savedEntity.toDomain();
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email).map(UserEntity::toDomain);
    }

}
