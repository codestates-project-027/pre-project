package com.stackoverflow.backend.question.domain;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.stackoverflow.backend.answer.domain.Answer;
import com.stackoverflow.backend.vote.domain.QuestionVote;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@ToString(exclude = "answerList")
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "question_id")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long id;
    @Column
    private String title;
    @Column
    private String contents;
    @Column
    private String userName;
    @Column
    private Long views;

    @Column
    private Long votes;
    @Column
    private LocalDateTime createdAt;

    @ElementCollection
    private List<String> tags;

    @ElementCollection
    private List<String> viewers;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answerList = new ArrayList<>();

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<QuestionVote> questionVoteList = new ArrayList<>();

    @Builder
    public Question(String title, String contents, String userName, List<String> tags){
        this.title = title;
        this.contents = contents;
        this.userName = userName;
        this.views = 0L;
        this.votes = 0L;
        this.createdAt = LocalDateTime.now();
        this.tags = tags;
    }

    public void addViewCount(){
        this.views++;
    }

    public void addViewer(String viewer){
        this.viewers.add(viewer);
    }

}
