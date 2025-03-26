package com.example.client.infrastructure;

import com.example.client.domain.User;
import jakarta.persistence.*;

@Entity
@Table(name="users")
public class UserEntity {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String nickname;

    //정적 팩토리 domain -> entity
    public static UserEntity fromDomain(User user){
        UserEntity e = new UserEntity();
        e.email = user.getEmail();
        e.password = user.getPassword();
        e.nickname = user.getNickname();
        return e;
    }

    // domain <- entity
    public User toDomain(){
        return new User(email,password,nickname);
    }

    //기본 생성자
    protected UserEntity() {}
}
