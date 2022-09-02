package com.stackoverflow.backend.answer.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.stackoverflow.backend.comment.domain.Comment;
import com.stackoverflow.backend.comment.domain.CommentDTO;
import com.stackoverflow.backend.question.domain.Question;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class AnswerDTO {

    @NotBlank(message = "답변글 내용은 공백일 수 없습니다.")
    private String contents;

    @NotBlank(message = "작성자 이름은 공백일 수 없습니다.")
    private String userName;

    @NotNull(message = "게시글 번호는 공백일 수 없습니다.")
    private Long questionId;

    @Builder
    public AnswerDTO(String contents,String userName, Long questionId){
        this.contents=contents;
        this.userName=userName;
        this.questionId=questionId;
    }

    @AllArgsConstructor
    @Getter
    public static class response{
        private Long id;
        private String contents;
        private String userName;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
        private LocalDateTime createdAt;
        private List<CommentDTO.response> commentList;
    }

    @AllArgsConstructor
    @Getter
    public static class patch{

        @NotBlank(message = "답변글 내용은 공백일 수 없습니다.")
        private String contents;

        private String dummy;
    }
}
