package com.example.client.domain;

import jakarta.persistence.*;


public class User {

    public User(String email, String password, String nickname) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }

    private String email;

    private String password;

    private String nickname;

    public boolean isPasswordMatch(String raw) {
        return this.password.equals(raw);
    }

    public String getEmail(){
        return email;
    }

    public String getNickname() {
        return nickname;
    }

    public String getPassword() {
        return password;
    }

}
