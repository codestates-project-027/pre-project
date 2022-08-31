package com.stackoverflow.backend.tag.service;


import com.stackoverflow.backend.exception.CustomException;
import com.stackoverflow.backend.exception.ErrorMessage;
import com.stackoverflow.backend.question.domain.*;
import com.stackoverflow.backend.question.mapper.QuestionTagMapper;
import com.stackoverflow.backend.tag.domain.TagRepository;
import com.stackoverflow.backend.tag.domain.questiontag.QuestionTagDTO;
import com.stackoverflow.backend.tag.domain.questiontag.QuestionTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final QuestionTagRepository questionTagRepository;
    private final QuestionRepository questionRepository;
    private final QuestionTagMapper questionTagMapper;
    public Page<QuestionTagDTO.responseQuestions> getQuestions(String tag, int page) {
        //todo refactoring
        try {
            Long tagId = tagRepository.findByTagName(tag).getId();
            if (page==0) page++;
            Page<QuestionTagDTO.responseQuestions> questions = questionTagRepository.findByTagId(tagId,PageRequest.of(page-1,5))
                    .map(entity -> {
                        QuestionTagDTO.responseQuestions dto = questionTagMapper.questionTagToQuestionTagResponseQuestions(entity);
                        return dto;
                    });
            return questions;
        } catch (Exception e){
            throw new CustomException(ErrorMessage.TAG_NOT_FOUND);
        }
    }
}
