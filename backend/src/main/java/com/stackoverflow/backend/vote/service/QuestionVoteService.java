package com.stackoverflow.backend.vote.service;


import com.stackoverflow.backend.exception.CustomException;
import com.stackoverflow.backend.exception.ErrorMessage;
import com.stackoverflow.backend.question.domain.Question;
import com.stackoverflow.backend.question.domain.QuestionRepository;
import com.stackoverflow.backend.vote.domain.QuestionVote;
import com.stackoverflow.backend.vote.domain.QuestionVoteDTO;
import com.stackoverflow.backend.vote.domain.QuestionVoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class QuestionVoteService {
    private final QuestionVoteRepository questionVoteRepository;
    private final QuestionRepository questionRepository;

    public void voteQuestion(QuestionVoteDTO questionVoteDTO, String UserName) {
        checkAuth(questionVoteDTO.getUserName(), UserName);
        Question question = checkQuestion(questionVoteDTO);
        Long questionVoteId = findMemberVote(questionVoteDTO, question);
        question.setActiveTime();
        questionRepository.save(question);
        if (questionVoteId!=0L) {
            questionVoteRepository.save(new QuestionVote(
                    questionVoteId, questionVoteDTO.getUserName(),
                    questionVoteDTO.getVote(),question));
        } else {
            questionVoteRepository.save(new QuestionVote(
                    questionVoteDTO.getUserName(),questionVoteDTO.getVote(),question));
        }
    }

    public void voteQuestionCancel(QuestionVoteDTO.Cancel questionVoteDTO, String UserName) {
        checkAuth(questionVoteDTO.getUserName(), UserName);
        Question question = questionRepository.findById(questionVoteDTO.getQuestionId())
                .orElseThrow(()->new CustomException(ErrorMessage.QUESTION_NOT_FOUND));
        try{
            questionVoteRepository.deleteById(
                    questionVoteRepository.findByQuestionAndUserName(question, questionVoteDTO.getUserName()).getId());
        } catch (Exception e){
            throw new CustomException(ErrorMessage.VOTE_NOT_FOUND);
        }
    }

    private Long findMemberVote(QuestionVoteDTO questionVoteDTO, Question question) {
        Long questionVoteId = 0L;
        for (QuestionVote questionVotes: question.getQuestionVoteList()){
            if (questionVotes.getUserName().equals(questionVoteDTO.getUserName())){
                if (questionVotes.getVote()== questionVoteDTO.getVote()) throw new CustomException(ErrorMessage.VOTE_CONFLICT);
                else questionVoteId = questionVotes.getId();
            }
        }
        return questionVoteId;
    }

    private Question checkQuestion(QuestionVoteDTO questionVoteDTO) {
        return questionRepository.findById(questionVoteDTO.getQuestionId())
                .orElseThrow(()->new CustomException(ErrorMessage.QUESTION_NOT_FOUND));
    }

    private void checkAuth(String userName1, String userName2) {
        if (!userName1.equals(userName2)) throw new CustomException(ErrorMessage.USERNAME_NOT_EQUAL);
    }
}
