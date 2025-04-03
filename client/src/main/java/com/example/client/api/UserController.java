package com.example.client.api;

import com.example.client.api.dto.LoginRequest;
import com.example.client.api.dto.RegisterRequest;
import com.example.client.application.UserService;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final StringRedisTemplate redisTemplate;

    public UserController(UserService userService, StringRedisTemplate redisTemplate){
        this.userService = userService;
        this.redisTemplate =redisTemplate;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@ModelAttribute RegisterRequest request){
        userService.register(request.getEmail(), request.getPassword(), request.getName());
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<String> Login(@RequestBody LoginRequest request){
        String token = userService.login(request.getEmail(),request.getPassword());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization")String authHeader) {
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("토큰없음");
        }
        String token = authHeader.replace("Bearer ","");
        redisTemplate.delete(token);

        return ResponseEntity.ok("로그아웃 성공");
    }

}
