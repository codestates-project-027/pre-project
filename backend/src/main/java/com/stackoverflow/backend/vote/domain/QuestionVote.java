package com.stackoverflow.backend.vote.domain;


import com.stackoverflow.backend.question.domain.Question;
import lombok.*;

import javax.persistence.*;
import java.util.Map;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class QuestionVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "questionVote_id")
    private Long id;

    @Column
    private String member;

    @Column
    private Boolean vote;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "question_id")
    private Question question;

    @Builder
    public QuestionVote(String member, Boolean vote, Question question){
        this.member = member;
        this.vote = vote;
        this.question = question;
    }
}
