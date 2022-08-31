package com.stackoverflow.backend.vote.domain;

import com.stackoverflow.backend.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
    QuestionVote findByQuestionAndMember(Question question,String member);
}
