package com.stackoverflow.backend.comment.controller;


import com.stackoverflow.backend.auth.oauth.PrincipalDetails;
import com.stackoverflow.backend.comment.domain.CommentDTO;
import com.stackoverflow.backend.comment.service.CommentService;
import com.stackoverflow.backend.exception.CustomException;
import com.stackoverflow.backend.exception.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;


    @PostMapping("")
    private ResponseEntity createComment(@Valid @RequestBody CommentDTO commentDTO,
                                         @AuthenticationPrincipal PrincipalDetails principalDetails){
        String userName = principalDetails.getUserName();
        if (!commentDTO.getUserName().equals(userName)) throw new CustomException(ErrorMessage.USERNAME_NOT_EQUAL);
        commentService.createComment(commentDTO, principalDetails.getUserName());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{comment_id}")
    private ResponseEntity deleteComment(@PathVariable Long comment_id,
                                         @AuthenticationPrincipal PrincipalDetails principalDetails){
        commentService.deleteComment(comment_id, principalDetails.getUserName());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
