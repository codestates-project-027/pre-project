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

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Component
public class AnswerService {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;


    @Transactional
    public void createAnswer(AnswerDTO answerDTO, String UserName) {
        checkAuth(answerDTO.getUserName(), UserName);
        Question question = questionRepository.findById(answerDTO.getQuestionId())
                .orElseThrow(()->new CustomException(ErrorMessage.QUESTION_NOT_FOUND));
        countAnswer(question, "add");
        answerRepository.save(new Answer(answerDTO.getContents(), answerDTO.getUserName(), question));
    }

    public void patchAnswer(Long answer_id, AnswerDTO.patch answerDTO, String UserName){
        Answer answer = answerRepository.findById(answer_id)
                .orElseThrow(() -> new CustomException(ErrorMessage.ANSWER_NOT_FOUND));
        checkAuth(answer.getUserName(), UserName);
        if (answerDTO.getContents()!=null) answer.setContents(answerDTO.getContents());
        answerRepository.save(answer);
    }

    @Transactional
    public void deleteAnswer(Long answer_id, String UserName) {
        Answer answer = answerRepository.findById(answer_id)
                .orElseThrow(()->new CustomException(ErrorMessage.ANSWER_NOT_FOUND));
        checkAuth(answer.getUserName(), UserName);
        countAnswer(answer.getQuestion(), "sub");
        answerRepository.deleteById(answer_id);
    }


    private void countAnswer(Question question, String fun){
        if (fun.equals("add")) {
            question.addAnswerCount();
            questionRepository.save(question);
        }
        else {
            question.subAnswerCount();
            questionRepository.save(question);
        }
    }

    private void checkAuth(String userName1, String userName2) {
        if (!userName1.equals(userName2)) throw new CustomException(ErrorMessage.USERNAME_NOT_EQUAL);
    }
}
