package com.stackoverflow.backend.exception;


import com.stackoverflow.backend.auth.dto.Response;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

@Getter
@Builder
public class ErrorResponse {
    private final LocalDateTime localDateTime = LocalDateTime.now();
    private final int status;
    private final String error;
    private final String code;
    private final String[] message;

    public static ResponseEntity<ErrorResponse> toResponseEntity(ErrorMessage errorMessage){
        return ResponseEntity
                .status(errorMessage.getStatus())
                .body(ErrorResponse.builder()
                        .status(errorMessage.getStatus().value())
                        .error(errorMessage.getStatus().name())
                        .code(errorMessage.name())
                        .message(new String[]{errorMessage.getMessage()})
                        .build());
    }
    public static ResponseEntity<Object> toResponseEntity(ErrorMessage errorMessage, BindingResult bindingResult) {
        return ResponseEntity
                .status(errorMessage.getStatus())
                .body(ErrorResponse.builder()
                        .status(errorMessage.getStatus().value())
                        .error(errorMessage.getStatus().name())
                        .code(errorMessage.name())
                        .message(bindingResult.getFieldErrors().stream().map(FieldError::getDefaultMessage).toArray(String[]::new))
                        .build()
                );
    }


}
