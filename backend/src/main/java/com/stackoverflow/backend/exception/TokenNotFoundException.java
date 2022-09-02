package com.stackoverflow.backend.exception;

public class TokenNotFoundException extends RuntimeException {
    public TokenNotFoundException(String message) {
        super(message);
    }
}
