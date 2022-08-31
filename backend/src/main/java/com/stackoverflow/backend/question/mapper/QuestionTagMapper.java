package com.stackoverflow.backend.question.mapper;


import com.stackoverflow.backend.tag.domain.questiontag.QuestionTag;
import com.stackoverflow.backend.tag.domain.questiontag.QuestionTagDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionTagMapper {
    QuestionTagDTO.responseQuestions questionTagToQuestionTagResponseQuestions(QuestionTag questionTag);
}
