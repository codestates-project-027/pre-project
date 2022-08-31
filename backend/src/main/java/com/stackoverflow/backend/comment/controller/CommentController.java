package com.stackoverflow.backend.comment.controller;


import com.stackoverflow.backend.comment.domain.CommentDTO;
import com.stackoverflow.backend.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;


    @PostMapping("")
    private ResponseEntity createComment(@Valid @RequestBody CommentDTO commentDTO){
        commentService.createComment(commentDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{comment_id}")
    private ResponseEntity deleteComment(@PathVariable Long comment_id){
        commentService.deleteComment(comment_id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
