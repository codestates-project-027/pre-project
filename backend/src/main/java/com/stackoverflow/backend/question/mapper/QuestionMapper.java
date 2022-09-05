package com.stackoverflow.backend.question.mapper;


import com.stackoverflow.backend.question.domain.Question;
import com.stackoverflow.backend.question.domain.QuestionDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionDTOToQuestion(QuestionDTO questionDTO);

    QuestionDTO questionToQuestionDTO(Question question);
    QuestionDTO.response questionToQuestionResponse(Question question);
    QuestionDTO.responsePage questionToQuestionResponsePage(Question question);
    List<QuestionDTO.response> questionsToQuestionResponses(List<Question> questions);
}
