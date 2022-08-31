package com.stackoverflow.backend.answer.controller;

import com.stackoverflow.backend.answer.domain.Answer;
import com.stackoverflow.backend.answer.domain.AnswerDTO;
import com.stackoverflow.backend.answer.service.AnswerService;
import com.stackoverflow.backend.question.domain.Question;
import com.stackoverflow.backend.question.domain.QuestionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/answer")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    @PostMapping("")
    private ResponseEntity createAnswer(@Valid @RequestBody AnswerDTO answerDTO){
        answerService.createAnswer(answerDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{answer_id}")
    private ResponseEntity patchAnswer(@PathVariable Long answer_id,
                             @Valid @RequestBody AnswerDTO.patch answerDTO){
        //todo issue security Auth
        answerService.patchAnswer(answer_id, answerDTO);
        return new ResponseEntity<>(HttpStatus.RESET_CONTENT);
    }
    @DeleteMapping("/{answer_id}")
    private ResponseEntity deleteAnswer(@PathVariable Long answer_id){
        answerService.deleteAnswer(answer_id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
