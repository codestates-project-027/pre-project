package com.stackoverflow.backend.tag.domain.questiontag;

import com.stackoverflow.backend.question.domain.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface QuestionTagRepository extends JpaRepository<QuestionTag, Long> {
    List<QuestionTag> findByQuestionId(Long questionId);

    @Transactional
    void deleteAllByQuestion(Question question);
    Page<QuestionTag> findByTagId(Long tagId, Pageable pageable);

}
