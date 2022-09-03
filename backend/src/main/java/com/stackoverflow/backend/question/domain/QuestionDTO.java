package com.stackoverflow.backend.question.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.stackoverflow.backend.answer.domain.AnswerDTO;
import lombok.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class QuestionDTO {
    private Long id;

    @NotBlank(message = "게시글 제목은 공백일 수 없습니다.")
    private String title;

    @NotBlank(message = "게시글 내용은 공백일 수 없습니다.")
    private String contents;

    @NotBlank(message = "작성자 이름은 공백일 수 없습니다.")
    private String userName;

    @NotNull(message = "태그객체 정보가 필요합니다.")
    private List<String> tags;

    @Builder
    public QuestionDTO(Long id, String title, String contents, String userName, List<String> tags){
        this.id=id;
        this.title = title;
        this.contents = contents;
        this.userName = userName;
        this.tags = tags;
    }

    @Builder
    public QuestionDTO(String title, String contents, String userName, List<String> tags){
        this.title=title;
        this.contents=contents;
        this.userName=userName;
        this.tags = tags;
    }

    @AllArgsConstructor
    @Getter
    public static class response{
        private Long id;
        private String title;
        private String contents;
        private String userName;
        private Long views;
        private Long votes;
        private Long answers;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd",timezone = "Asia/Seoul")
        private LocalDateTime createdAt;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
        private LocalDateTime active;
        private List<String> tags;
        private List<AnswerDTO.response> answerList;
    }

    @AllArgsConstructor
    @Getter
    public static class responsePage{
        private Long id;
        private String title;
        private String contents;
        private String userName;
        private Long views;
        private Long votes;
        private Long answers;
        private List<String> tags;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd",timezone = "Asia/Seoul")
        private LocalDateTime createdAt;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
        private LocalDateTime active;
    }

    @AllArgsConstructor
    @Getter
    public static class patch{
        private String title;
        private String contents;
        private List<String> tags;
    }
}
