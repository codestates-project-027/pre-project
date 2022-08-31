package com.stackoverflow.backend.tag.domain.questiontag;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionTagRepository extends JpaRepository<QuestionTag, Long> {
    List<QuestionTag> findByQuestionId(Long questionId);
    Page<QuestionTag> findByTagId(Long tagId, Pageable pageable);

}
