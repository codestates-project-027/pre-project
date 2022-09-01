package com.stackoverflow.backend.question.service;

import com.stackoverflow.backend.exception.CustomException;
import com.stackoverflow.backend.exception.ErrorMessage;
import com.stackoverflow.backend.question.domain.*;
import com.stackoverflow.backend.question.mapper.QuestionMapper;
import com.stackoverflow.backend.tag.domain.Tag;
import com.stackoverflow.backend.tag.domain.TagRepository;
import com.stackoverflow.backend.tag.domain.questiontag.QuestionTag;
import com.stackoverflow.backend.tag.domain.questiontag.QuestionTagRepository;
import com.stackoverflow.backend.vote.domain.QuestionVote;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;
    private final TagRepository tagRepository;
    private final QuestionTagRepository questionTagRepository;
    private final ApplicationEventPublisher eventPublisher;


    public Page<QuestionDTO.responsePage> getQuestions(int page){
        if (page==0) page++;
        return questionRepository.findBy(PageRequest.of(page-1,10))
                .map(entity -> {
                    QuestionDTO.responsePage dto = questionMapper.questionToQuestionResponsePage(entity);
            return dto;
        });
    }

    public QuestionDTO.response getQuestion(Long question_id, String userIp){
        Question question = checkQuestion(question_id);
        eventPublisher.publishEvent(new ViewEvent(eventPublisher,question_id, secureIp(userIp)));
        question.setVotes(getQuestionVotes(question));
        return questionMapper.questionToQuestionResponse(question);
    }

    public void createQuestion(QuestionDTO questionDTO) {
        Question question = questionRepository.save(questionMapper.questionDTOToQuestion(questionDTO));
        checkTag(questionDTO.getTags());
        questionDTO.getTags().forEach(tag -> {
            Tag findTag = tagRepository.findByTagName(tag);
            questionTagRepository.save(new QuestionTag(question, findTag));
        });
    }

    public void patchQuestion(Long question_id, QuestionDTO.patch questionDTO) {
        //todo refactoring
        Question question = checkQuestion(question_id);
        if (!(questionDTO.getTitle()==null||questionDTO.getTitle().isBlank())) question.setTitle(questionDTO.getTitle());
        if (!(questionDTO.getContents()==null||questionDTO.getContents().isBlank())) question.setContents(questionDTO.getContents());
        if (questionDTO.getTags()!=null) {
            checkTag(questionDTO.getTags());
            question.setTags(questionDTO.getTags());
        }
        questionRepository.save(question);
    }

    public void deleteQuestion(Long question_id) {
        checkQuestion(question_id);
        List<QuestionTag> questionTags = questionTagRepository.findByQuestionId(question_id);
        questionTags.forEach(e -> e.setQuestion(null));
        questionRepository.deleteById(question_id);
    }

    private Question checkQuestion(Long question_id) {
        return questionRepository.findById(question_id).orElseThrow(
                () -> new CustomException(ErrorMessage.QUESTION_NOT_FOUND));
    }

    private void checkTag(List<String> tagList) {
        tagList.forEach(tag -> {
            if (tagRepository.existsByTagName(tag)) return ;
            tagRepository.save(new Tag(tag));
        });
    }

    private String secureIp(String userIp) {
        LocalDate now = LocalDate.now();
        try {
            return Encryption.SHA256(userIp +now);
        } catch (Exception e) {
            throw new CustomException(ErrorMessage.QUESTION_NOT_FOUND);
        }
    }

    private Long getQuestionVotes(Question question) {
        Long votes = 0L;
        for(QuestionVote questionVotes: question.getQuestionVoteList()){
            if (questionVotes.getVote()) votes++;
            else votes--;
        }
        return votes;
    }
}
