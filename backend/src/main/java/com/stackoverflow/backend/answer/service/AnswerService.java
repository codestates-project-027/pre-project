package com.stackoverflow.backend.answer.service;

import com.stackoverflow.backend.answer.domain.Answer;
import com.stackoverflow.backend.answer.domain.AnswerDTO;
import com.stackoverflow.backend.answer.domain.AnswerRepository;
import com.stackoverflow.backend.answer.mapper.AnswerMapper;
import com.stackoverflow.backend.exception.CustomException;
import com.stackoverflow.backend.exception.ErrorMessage;
import com.stackoverflow.backend.question.domain.Question;
import com.stackoverflow.backend.question.domain.QuestionDTO;
import com.stackoverflow.backend.question.domain.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Component
public class AnswerService {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public void createAnswer(AnswerDTO answerDTO) {
        Question question = questionRepository.findById(answerDTO.getQuestionId())
                .orElseThrow(()->new CustomException(ErrorMessage.QUESTION_NOT_FOUND));
        answerRepository.save(new Answer(answerDTO.getContents(), answerDTO.getUserName(), question));
    }
    public void patchAnswer(Long answer_id, AnswerDTO.patch answerDTO){
        Answer answer = answerRepository.findById(answer_id)
                .orElseThrow(() -> new CustomException(ErrorMessage.ANSWER_NOT_FOUND));
        if (answerDTO.getContents()!=null) answer.setContents(answerDTO.getContents());
        answerRepository.save(answer);
    }

    public void deleteAnswer(Long answer_id) {
        answerRepository.findById(answer_id)
                .orElseThrow(()->new CustomException(ErrorMessage.ANSWER_NOT_FOUND));
        answerRepository.deleteById(answer_id);
    }
}
