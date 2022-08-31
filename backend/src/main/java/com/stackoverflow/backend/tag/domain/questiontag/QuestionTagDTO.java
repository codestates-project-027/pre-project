package com.stackoverflow.backend.tag.domain.questiontag;

import com.stackoverflow.backend.question.domain.Question;
import com.stackoverflow.backend.question.domain.QuestionDTO;
import com.stackoverflow.backend.tag.domain.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class QuestionTagDTO {
    private Long id;

    private Question question;

    private Tag tag;


    @AllArgsConstructor
    @Getter
    public static class responseQuestions{
        private QuestionDTO.responsePage question;
    }
}
