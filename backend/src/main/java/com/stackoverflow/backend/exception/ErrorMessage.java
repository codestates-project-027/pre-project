package com.stackoverflow.backend.exception;


import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ErrorMessage {
    QUESTION_NOT_FOUND(HttpStatus.NOT_FOUND, "Question Not Found"),
    ANSWER_NOT_FOUND(HttpStatus.NOT_FOUND, "Answer Not Found"),
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Comment Not Found"),
    TAG_NOT_FOUND(HttpStatus.NOT_FOUND, "Tag Not Found"),
    FORM_NOT_VAILD(HttpStatus.BAD_REQUEST,"Form Not Valid"),
    VOTE_CONFLICT(HttpStatus.CONFLICT,"Overlapped Vote"),
    VOTE_NOT_FOUND(HttpStatus.NOT_FOUND, "Vote Not Found"),
    EMAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "Email Not Found"),
    USERNAME_NOT_FOUND(HttpStatus.NOT_FOUND, "Username Not Found"),
    PASSWORD_NOT_FOUND(HttpStatus.NOT_FOUND, "Password Not Found");

    @Getter
    private HttpStatus status;

    @Getter
    private String message;

    ErrorMessage(HttpStatus code, String message) {
        this.status = code;
        this.message = message;
    }
}
