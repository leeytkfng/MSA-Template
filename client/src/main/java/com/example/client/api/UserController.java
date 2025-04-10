package com.example.client.api;

import com.example.client.api.dto.LoginRequest;
import com.example.client.api.dto.RegisterRequest;
import com.example.client.api.dto.UpdateRequest;
import com.example.client.application.JwtTokenProvider;
import com.example.client.application.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "User API" , description = "사용자 관련 api")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final StringRedisTemplate redisTemplate;
    private final JwtTokenProvider jwtTokenProvider;

    public UserController(UserService userService, StringRedisTemplate redisTemplate , JwtTokenProvider jwtTokenProvider){
        this.userService = userService;
        this.redisTemplate =redisTemplate;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/register")
    @Operation(summary = "사용자 회원가입" , description = "규격에 따라서 회원가입")
    public ResponseEntity<String> register(@ModelAttribute RegisterRequest request){
        userService.register(request.getEmail(), request.getPassword(), request.getName());
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    @Operation(summary = "사용자 로그인" ,description = "이메일,비밀번호로 로그인")
    public ResponseEntity<String> Login(@RequestBody LoginRequest request){
        String token = userService.login(request.getEmail(),request.getPassword());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/logout")
    @Operation(summary = "사용자 로그아웃" ,description = "Redis,Jwt 토큰삭제")
    public ResponseEntity<?> logout(@RequestHeader("Authorization")String authHeader) {
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("토큰없음");
        }
        String token = authHeader.replace("Bearer ","");
        redisTemplate.delete(token);

        return ResponseEntity.ok("로그아웃 성공");
    }

    @PutMapping("/update")
    @Operation(summary = "사용자 정보수정" ,description = "주소기입 or 기존정보 수정")
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String authHeader, @RequestBody UpdateRequest request) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("토큰없음");
        }
        String token = authHeader.replace("Bearer ", "");
        String email = jwtTokenProvider.getEmailByToken(token);
        userService.updateUser(token, email, request.getName(), request.getAddress());

        return ResponseEntity.ok("사용자 정보 업데이트 성공");
    }

    @GetMapping("/info")
    @Operation(summary = "사용자 상세정보" ,description = "마이페이지 관련")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization")String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("토큰없음");
        }
        String token = authHeader.replace("Bearer ", "");
        String email = jwtTokenProvider.getEmailByToken(token);

        return ResponseEntity.ok(userService.getUserInfo(email));
    }

}
