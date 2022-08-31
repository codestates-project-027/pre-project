package com.stackoverflow.backend.vote.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class QuestionVoteDTO {
    @NotNull(message = "게시글 번호는 공백일 수 없습니다.")
    private Long questionId;

    @NotBlank(message = "투표자는 공백일 수 없습니다.")
    private String member;

    @NotNull(message = "vote 값은 공백일 수 없습니다.")
    private Boolean vote;

    @AllArgsConstructor
    @Getter
    public static class Cancel{
        @NotNull(message = "게시글 번호는 공백일 수 없습니다.")
        private Long questionId;
        @NotBlank(message = "투표자는 공백일 수 없습니다.")
        private String member;
    }
}
