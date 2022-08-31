package com.stackoverflow.backend.exception;

import lombok.Getter;

public class CustomException extends RuntimeException{
    @Getter
    private ErrorMessage errorMessage;

    public CustomException(ErrorMessage errorMessage) {
        super(errorMessage.getMessage());
        this.errorMessage = errorMessage;
    }
}