package com.stackoverflow.backend.answer.service;

import com.stackoverflow.backend.answer.domain.Answer;
import com.stackoverflow.backend.answer.domain.AnswerDTO;
import com.stackoverflow.backend.answer.domain.AnswerRepository;
import com.stackoverflow.backend.exception.CustomException;
import com.stackoverflow.backend.exception.ErrorMessage;
import com.stackoverflow.backend.question.domain.Question;
import com.stackoverflow.backend.question.domain.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

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
        countAnswerAndActive(question, "add");
        answerRepository.save(new Answer(answerDTO.getContents(), answerDTO.getUserName(), question));
    }

    public void patchAnswer(Long answer_id, AnswerDTO.patch answerDTO, String UserName){
        Answer answer = answerRepository.findById(answer_id)
                .orElseThrow(() -> new CustomException(ErrorMessage.ANSWER_NOT_FOUND));
        checkAuth(answer.getUserName(), UserName);
        if (answerDTO.getContents()!=null) answer.setContents(answerDTO.getContents());
        answerRepository.save(answer);
        countAnswerAndActive(answer.getQuestion(),"none");
    }

    @Transactional
    public void deleteAnswer(Long answer_id, String UserName) {
        Answer answer = answerRepository.findById(answer_id)
                .orElseThrow(()->new CustomException(ErrorMessage.ANSWER_NOT_FOUND));
        checkAuth(answer.getUserName(), UserName);
        countAnswerAndActive(answer.getQuestion(), "sub");
        answerRepository.deleteById(answer_id);
    }


    private void countAnswerAndActive(Question question, String fun){
        if (fun.equals("add")) question.addAnswerCount();
        if (fun.equals("sub")) question.subAnswerCount();
        question.setActiveTime();
        questionRepository.save(question);
    }

    private void checkAuth(String userName1, String userName2) {
        if (!userName1.equals(userName2)) throw new CustomException(ErrorMessage.USERNAME_NOT_EQUAL);
    }
}
