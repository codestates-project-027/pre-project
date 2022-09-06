package com.stackoverflow.backend.vote.controller;


import com.stackoverflow.backend.auth.oauth.PrincipalDetails;
import com.stackoverflow.backend.vote.domain.QuestionVoteDTO;
import com.stackoverflow.backend.vote.service.QuestionVoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/vote")
@RequiredArgsConstructor
public class QuestionVoteController {
    private final QuestionVoteService questionVoteService;

    @PostMapping("/question")
    private ResponseEntity voteQuestion(@Valid @RequestBody QuestionVoteDTO questionVoteDTO,
                                        @AuthenticationPrincipal PrincipalDetails principalDetails){
        questionVoteService.voteQuestion(questionVoteDTO, principalDetails.getUserName());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/question/{questionId}/{userName}")
    private ResponseEntity voteQuestionCancel(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                              @PathVariable Long questionId,
                                              @PathVariable String userName){
        questionVoteService.voteQuestionCancel(questionId, userName, principalDetails.getUserName());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
