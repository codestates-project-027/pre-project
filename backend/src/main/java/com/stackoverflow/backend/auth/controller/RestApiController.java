package com.stackoverflow.backend.auth.controller;

import com.stackoverflow.backend.auth.model.Member;
import com.stackoverflow.backend.auth.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class RestApiController {

    private final MemberRepository memberRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/login")
    public String login() {
        return "로그인 완료";
    }
    @PostMapping("/token")
    public String token() {
        return "<h1>token</h1>";
    }


    @PostMapping("/join")
    public ResponseEntity join(@RequestBody Member member) {
        Member existEmail = memberRepository.findByEmail(member.getEmail());
        if (existEmail == null) {
            member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
            member.setRoles("ROLE_USER");
            memberRepository.save(member);
            return new ResponseEntity<>("회원가입완료", HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>("email 중복", HttpStatus.BAD_REQUEST);
        }
    }

}