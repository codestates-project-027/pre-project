package com.stackoverflow.backend.auth.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank(message = "올바른 이메일 주소가 아닙니다.")
    @Email
    private String email;
    @NotBlank(message = "닉네임은 공백이 아니어야 합니다.")
    private  String username;
    @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
    private String password;
    private String roles; // User, MANAGER, ADMIN

    private LocalDateTime createdAt = LocalDateTime.now();

    public List<String> getRoleList() {
        if(this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

}
