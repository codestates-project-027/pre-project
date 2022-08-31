package com.stackoverflow.backend.tag.controller;

import com.stackoverflow.backend.tag.domain.questiontag.QuestionTagDTO;
import com.stackoverflow.backend.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tag")
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;

    @GetMapping("/{tag}")
    private ResponseEntity<Page<QuestionTagDTO.responseQuestions>> getQuestions(@PathVariable String tag,
                                                                                @RequestParam int page) {
        return new ResponseEntity<>(tagService.getQuestions(tag, page), HttpStatus.OK);
    }
}
