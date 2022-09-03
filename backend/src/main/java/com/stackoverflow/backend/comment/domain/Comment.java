package com.stackoverflow.backend.comment.domain;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.stackoverflow.backend.answer.domain.Answer;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "comment_id")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @Column
    private String userName;

    @Column
    private String contents;

    @CreatedDate
    private LocalDateTime createdAt;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "answer_id")
    private Answer answer;

    @Builder
    public Comment(String contents, String userName, Answer answer){
        this.contents = contents;
        this.userName = userName;
        this.createdAt = LocalDateTime.now();
        this.answer = answer;
    }
}
