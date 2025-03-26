package com.example.client.application;

import com.example.client.domain.User;
import com.example.client.domain.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository repository) {
        this.userRepository = repository;
    }

    public void register(String email , String password, String nickname){
        userRepository.findByEmail(email).ifPresent(user-> {
            throw new IllegalArgumentException("이미 존재하는 사용자입니다.");
        });

        User user = new User(email,password,nickname);
        userRepository.save(user);
    }
}
