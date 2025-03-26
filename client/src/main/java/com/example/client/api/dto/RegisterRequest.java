package com.example.client.api.dto;

public class RegisterRequest {
    private String email;
    private String password;
    private String nickname;

    // 기본 생성자
    public RegisterRequest() {}

    // Getter/Setter
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getNickname() { return nickname; }
    public void setNickname(String nickname) { this.nickname = nickname; }
}
