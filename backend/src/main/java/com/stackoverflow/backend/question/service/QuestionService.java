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
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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


    public Page<QuestionDTO.responsePage> getQuestions(int page, String sortValue,String sort){
        if (page==0) page++;
        if (sortValue==null) sortValue="createdAt";
        if (sort==null || sort.equals("max")) {
            return questionRepository.findBy(PageRequest.of(page-1,10, Sort.by(sortValue).descending()))
                    .map(questionMapper::questionToQuestionResponsePage);
        }
        return questionRepository.findBy(PageRequest.of(page-1,10, Sort.by(sortValue).ascending()))
                .map(questionMapper::questionToQuestionResponsePage);
    }

    public QuestionDTO.response getQuestion(Long question_id, String userIp){
        Question question = checkQuestion(question_id);
        eventPublisher.publishEvent(new ViewEvent(eventPublisher,question_id, secureIp(userIp)));
        return questionMapper.questionToQuestionResponse(question);
    }

    public void createQuestion(QuestionDTO questionDTO, String UserName) {
        checkAuth(questionDTO.getUserName(), UserName);
        Question question = questionRepository.save(questionMapper.questionDTOToQuestion(questionDTO));
        saveTag(questionDTO.getTags(), question);
    }


    @Transactional
    public void patchQuestion(Long question_id, QuestionDTO.patch questionDTO, String UserName) {
        //todo refactoring
        Question question = checkQuestion(question_id);
        checkAuth(question.getUserName(), UserName);
        if (!(questionDTO.getTitle()==null||questionDTO.getTitle().isBlank())) question.setTitle(questionDTO.getTitle());
        if (!(questionDTO.getContents()==null||questionDTO.getContents().isBlank())) question.setContents(questionDTO.getContents());
        if (questionDTO.getTags()!=null) {
            questionTagRepository.deleteAllByQuestion(question);
            saveTag(questionDTO.getTags(), question);
            question.setTags(questionDTO.getTags());
            question.setActiveTime();
        }
        questionRepository.save(question);
    }

    public void deleteQuestion(Long question_id, String UserName) {
        checkAuth(checkQuestion(question_id).getUserName(), UserName);
        questionRepository.deleteById(question_id);
    }

    private Question checkQuestion(Long question_id) {
        return questionRepository.findById(question_id).orElseThrow(
                () -> new CustomException(ErrorMessage.QUESTION_NOT_FOUND));
    }

    private void saveTag(List<String> tagList, Question question) {
        tagList.forEach(tag -> {
            if (!tagRepository.existsByTagName(tag)) tagRepository.save(new Tag(tag));
            Tag findTag = tagRepository.findByTagName(tag);
            questionTagRepository.save(new QuestionTag(question, findTag));
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

    private void checkAuth(String userName1, String userName2) {
        if (!userName1.equals(userName2)) throw new CustomException(ErrorMessage.USERNAME_NOT_EQUAL);
    }

//    //disabled
//    private Long getQuestionVotes(Question question) {
//        Long votes = 0L;
//        for(QuestionVote questionVotes: question.getQuestionVoteList()){
//            if (questionVotes.getVote()) votes++;
//            else votes--;
//        }
//        return votes;
//    }
}
