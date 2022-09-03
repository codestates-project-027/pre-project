package com.stackoverflow.backend.vote.domain;

import com.stackoverflow.backend.question.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
    QuestionVote findByQuestionAndUserName(Question question,String userName);
}
