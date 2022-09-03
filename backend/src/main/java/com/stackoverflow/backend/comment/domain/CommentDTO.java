package com.stackoverflow.backend.comment.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CommentDTO {

    @NotBlank(message = "작성자 이름은 공백일 수 없습니다.")
    private String userName;

    @NotBlank(message = "코멘트 내용은 공백일 수 없습니다.")
    private String contents;

    @NotNull(message = "답변글 번호는 공백일 수 없습니다.")
    private Long answerId;

    @AllArgsConstructor
    @Getter
    public static class response{
        private Long id;
        private String contents;
        private String userName;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd",timezone = "Asia/Seoul")
        private LocalDateTime createdAt;
    }
}
