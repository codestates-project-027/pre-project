package com.stackoverflow.backend.question.controller;


import com.stackoverflow.backend.auth.oauth.PrincipalDetails;
import com.stackoverflow.backend.exception.CustomException;
import com.stackoverflow.backend.exception.ErrorMessage;
import com.stackoverflow.backend.question.domain.QuestionDTO;
import com.stackoverflow.backend.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

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
    private ResponseEntity createQuestion(@Valid @RequestBody QuestionDTO questionDTO,
    @AuthenticationPrincipal PrincipalDetails principalDetails){
        String userName = principalDetails.getUserName();
        if (!questionDTO.getUserName().equals(userName)) throw new CustomException(ErrorMessage.USERNAME_NOT_EQUAL);
        questionService.createQuestion(questionDTO, principalDetails.getUserName());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{question_id}")
    private ResponseEntity patchQuestion(@PathVariable Long question_id,
                                      @Valid @RequestBody QuestionDTO.patch questionDTO,
                                         @AuthenticationPrincipal PrincipalDetails principalDetails) {
        questionService.patchQuestion(question_id, questionDTO, principalDetails.getUserName());
        return new ResponseEntity<>(HttpStatus.RESET_CONTENT);
    }

    @DeleteMapping("/{question_id}")
    private ResponseEntity deleteQuestion(@PathVariable Long question_id,
                                          @AuthenticationPrincipal PrincipalDetails principalDetails){
        questionService.deleteQuestion(question_id, principalDetails.getUserName());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
