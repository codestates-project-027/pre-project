package com.stackoverflow.backend.answer.controller;

import com.stackoverflow.backend.answer.domain.AnswerDTO;
import com.stackoverflow.backend.answer.service.AnswerService;
import com.stackoverflow.backend.auth.oauth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/answer")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    @PostMapping("")
    private ResponseEntity createAnswer(@Valid @RequestBody AnswerDTO answerDTO,
                                        @AuthenticationPrincipal PrincipalDetails principalDetails){
        answerService.createAnswer(answerDTO, principalDetails.getUserName());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{answer_id}")
    private ResponseEntity patchAnswer(@PathVariable Long answer_id,
                             @Valid @RequestBody AnswerDTO.patch answerDTO,
                                       @AuthenticationPrincipal PrincipalDetails principalDetails){
        answerService.patchAnswer(answer_id, answerDTO, principalDetails.getUserName());
        return new ResponseEntity<>(HttpStatus.RESET_CONTENT);
    }
    @DeleteMapping("/{answer_id}")
    private ResponseEntity deleteAnswer(@PathVariable Long answer_id,
                                        @AuthenticationPrincipal PrincipalDetails principalDetails){
        answerService.deleteAnswer(answer_id, principalDetails.getUserName());
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
