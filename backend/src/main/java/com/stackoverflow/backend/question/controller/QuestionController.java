package com.stackoverflow.backend.question.controller;


import com.stackoverflow.backend.exception.CustomException;
import com.stackoverflow.backend.exception.ErrorMessage;
import com.stackoverflow.backend.question.domain.Question;
import com.stackoverflow.backend.question.domain.QuestionDTO;
import com.stackoverflow.backend.question.domain.QuestionRepository;
import com.stackoverflow.backend.question.mapper.QuestionMapper;
import com.stackoverflow.backend.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Filter;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/question")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping("")
    private Page<QuestionDTO.responsePage> getQuestions(@RequestParam int page, String sortValue, String sort){
        return questionService.getQuestions(page, sortValue, sort);
    }
    @GetMapping("/{question_id}")
    private ResponseEntity<QuestionDTO.response> getQuestion(
            @PathVariable Long question_id,
            HttpServletRequest request){
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null) { ip = request.getRemoteAddr();}
        return new ResponseEntity<>(questionService.getQuestion(question_id, ip),HttpStatus.OK);
    }
    @PostMapping("")
    private ResponseEntity createQuestion(@Valid @RequestBody QuestionDTO questionDTO){
        questionService.createQuestion(questionDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{question_id}")
    private ResponseEntity patchQuestion(@PathVariable Long question_id,
                                      @Valid @RequestBody QuestionDTO.patch questionDTO) {
        questionService.patchQuestion(question_id, questionDTO);
        return new ResponseEntity<>(HttpStatus.RESET_CONTENT);
    }

    @DeleteMapping("/{question_id}")
    private ResponseEntity deleteQuestion(@PathVariable Long question_id){
        questionService.deleteQuestion(question_id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
