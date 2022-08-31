package com.stackoverflow.backend.auth.repository;

import com.stackoverflow.backend.auth.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.Email;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    public Member findByUsername(String member);
    Member findByEmail(String email);


}
