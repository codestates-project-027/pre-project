package com.stackoverflow.backend.comment.service;


import com.stackoverflow.backend.answer.domain.Answer;
import com.stackoverflow.backend.answer.domain.AnswerRepository;
import com.stackoverflow.backend.comment.domain.Comment;
import com.stackoverflow.backend.comment.domain.CommentDTO;
import com.stackoverflow.backend.comment.domain.CommentRepository;
import com.stackoverflow.backend.exception.CustomException;
import com.stackoverflow.backend.exception.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final AnswerRepository answerRepository;

    public void createComment(CommentDTO commentDTO, String UserName) {
        checkAuth(commentDTO.getUserName(), UserName);
        Answer answer = answerRepository.findById(commentDTO.getAnswerId())
                .orElseThrow(()-> new CustomException(ErrorMessage.ANSWER_NOT_FOUND));
        commentRepository.save(new Comment(commentDTO.getContents(), commentDTO.getUserName(),answer));
    }

    public void deleteComment(Long comment_id, String UserName) {
        Comment comment = commentRepository.findById(comment_id)
                .orElseThrow(()->new CustomException(ErrorMessage.COMMENT_NOT_FOUND));
        checkAuth(comment.getUserName(), UserName);
        commentRepository.deleteById(comment_id);
    }

    private void checkAuth(String userName1, String userName2) {
        if (!userName1.equals(userName2)) throw new CustomException(ErrorMessage.USERNAME_NOT_EQUAL);
    }
}
