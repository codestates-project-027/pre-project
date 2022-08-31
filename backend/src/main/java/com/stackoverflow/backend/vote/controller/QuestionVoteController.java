package com.stackoverflow.backend.vote.controller;


import com.stackoverflow.backend.vote.domain.QuestionVoteDTO;
import com.stackoverflow.backend.vote.service.QuestionVoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/vote")
@RequiredArgsConstructor
public class QuestionVoteController {
    private final QuestionVoteService questionVoteService;

    @PostMapping("/question")
    private ResponseEntity voteQuestion(@Valid @RequestBody QuestionVoteDTO questionVoteDTO){
        questionVoteService.voteQuestion(questionVoteDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/question")
    private ResponseEntity voteQuestionCancel(@Valid @RequestBody QuestionVoteDTO.Cancel questionVoteDTO){
        questionVoteService.voteQuestionCancel(questionVoteDTO);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
