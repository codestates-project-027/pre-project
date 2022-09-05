package com.stackoverflow.backend.vote.domain;


import com.stackoverflow.backend.question.domain.Question;
import lombok.*;

import javax.persistence.*;

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
    private String userName;

    @Column
    private Boolean vote;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "question_id")
    private Question question;

    @Builder
    public QuestionVote(String userName, Boolean vote, Question question){
        this.userName = userName;
        this.vote = vote;
        this.question = question;
    }
}
