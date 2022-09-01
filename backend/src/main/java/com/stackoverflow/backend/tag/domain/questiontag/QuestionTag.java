package com.stackoverflow.backend.tag.domain.questiontag;


import com.stackoverflow.backend.question.domain.Question;
import com.stackoverflow.backend.tag.domain.Tag;
import lombok.*;

import javax.persistence.*;


@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class QuestionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "questionTag_id")
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne()
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @Builder
    public QuestionTag(Question question, Tag tag){
        this.question = question;
        this.tag = tag;
    }
}
