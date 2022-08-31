package com.stackoverflow.backend.questiontest;


import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import com.stackoverflow.backend.answer.domain.Answer;
import com.stackoverflow.backend.answer.domain.AnswerDTO;
import com.stackoverflow.backend.comment.domain.Comment;
import com.stackoverflow.backend.comment.domain.CommentDTO;
import com.stackoverflow.backend.question.controller.QuestionController;
import com.stackoverflow.backend.question.domain.Question;
import com.stackoverflow.backend.question.domain.QuestionDTO;
import com.stackoverflow.backend.question.mapper.QuestionMapper;
import com.stackoverflow.backend.question.service.QuestionService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static com.stackoverflow.backend.questiontest.ApiDocumentUtils.getRequestPreProcessor;
import static com.stackoverflow.backend.questiontest.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders. *;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.request.RequestDocumentation.*;

@WebMvcTest(QuestionController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class QuestionTests {


    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private QuestionMapper questionMapper;

    @MockBean
    private QuestionService questionService;


    @Test
    @WithMockUser
    public void postMethod() throws Exception {
        //given
        QuestionDTO questionDTO = new QuestionDTO("글 제목", "글 내용", "작성자");
        String content = gson.toJson(questionDTO);
        given(questionMapper.questionDTOToQuestion(Mockito.any(QuestionDTO.class))).willReturn(new Question());
        //when
        ResultActions actions = mockMvc.perform(
                post("/question")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );
        //then
        actions.andExpect(status().isCreated())
                .andDo(document(
                        "post-question",
                        getRequestPreProcessor(),
                        requestFields(
                                fieldWithPath("title").description("글제목"),
                                fieldWithPath("contents").description("글내용"),
                                fieldWithPath("userName").description("작성자")
                        )
                ));
    }

    @Test
    @WithMockUser
    public void getMethod() throws Exception {

        Question question = new Question("제목", "내용", "글 작성자");
        Answer answer = new Answer("답변 내용", "답변 작성자", question);
        Comment comment = new Comment("댓글 내용", "댓글 작성자", answer);
        question.setId(1L);
        answer.setId(1L);
        comment.setId(1L);

        CommentDTO.response commentDTOResponse = new CommentDTO.response(
                comment.getId(),
                comment.getContents(),
                comment.getUserName(),
                comment.getCreatedAt()
        );

        List<CommentDTO.response> commentDTOResponseList = new ArrayList<>();
        commentDTOResponseList.add(commentDTOResponse);

        AnswerDTO.response answerDTOResponse = new AnswerDTO.response(
                answer.getId(),
                answer.getContents(),
                answer.getUserName(),
                answer.getCreatedAt(),
                commentDTOResponseList
        );

        List<AnswerDTO.response> answerDtoResponseList = new ArrayList<>();
        answerDtoResponseList.add(answerDTOResponse);

        QuestionDTO.response response = new QuestionDTO.response(
                question.getId(),
                question.getTitle(),
                question.getContents(),
                question.getUserName(),
                question.getViews(),
                question.getAnswers(),
                question.getCreatedAt(),
                answerDtoResponseList
        );

        given(questionService.getQuestion(Mockito.anyLong())).willReturn(response);
        long questionId = 1L;
        ResultActions actions = mockMvc.perform(
                get("/question/{question_id}", questionId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(response.getId()))
                .andExpect(jsonPath("$.title").value(response.getTitle()))
                .andExpect(jsonPath("$.contents").value(response.getContents()))
                .andExpect(jsonPath("$.userName").value(response.getUserName()))
                .andExpect(jsonPath("$.views").value(response.getViews()))
                .andExpect(jsonPath("$.answers").value(response.getAnswers()))
                .andDo(document(
                        "get-question",
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("question_id").description("질문 게시글 ID")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("게시글 ID"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("글제목"),
                                        fieldWithPath("contents").type(JsonFieldType.STRING).description("본문"),
                                        fieldWithPath("userName").type(JsonFieldType.STRING).description("작성자"),
                                        fieldWithPath("views").type(JsonFieldType.NUMBER).description("조회수"),
                                        fieldWithPath("answers").type(JsonFieldType.NUMBER).description("답변수"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("작성일"),
                                        fieldWithPath("answerList").type(JsonFieldType.ARRAY).description("답변리스트"),
                                        fieldWithPath("answerList[].id").type(JsonFieldType.NUMBER).description("답변 ID"),
                                        fieldWithPath("answerList[].contents").type(JsonFieldType.STRING).description("답변내용"),
                                        fieldWithPath("answerList[].userName").type(JsonFieldType.STRING).description("답변 작성자"),
                                        fieldWithPath("answerList[].createdAt").type(JsonFieldType.STRING).description("답변 작성일"),
                                        fieldWithPath("answerList[].commentList[]").type(JsonFieldType.ARRAY).description("코멘트리스트"),
                                        fieldWithPath("answerList[].commentList[].id").type(JsonFieldType.NUMBER).description("코멘트 ID"),
                                        fieldWithPath("answerList[].commentList[].contents").type(JsonFieldType.STRING).description("코멘트 내용"),
                                        fieldWithPath("answerList[].commentList[].userName").type(JsonFieldType.STRING).description("코멘트 작성자"),
                                        fieldWithPath("answerList[].commentList[].createdAt").type(JsonFieldType.STRING).description("코멘트 작성일")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser
    public void deleteMethod() throws Exception {
        //given
        long questionId = 1L;
        doNothing().when(questionService).deleteQuestion(Mockito.anyLong());

        //when
        ResultActions actions = mockMvc.perform(delete("/question/{question_id}", questionId)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON));
        actions.andExpect(status().isNoContent())
                .andDo(document(
                        "delete-question",
                        getRequestPreProcessor(),
                        pathParameters(
                                parameterWithName("question_id").description("질문 게시글 ID")
                        )
                ));
    }


    @Test
    public void getAllMethod() throws Exception{
        List<QuestionDTO.responsePage> questionDTOList = new ArrayList<>();
        int page = 1;
        int totalElements = 5;
        IntStream.range(0, totalElements)
                .forEach(e -> {
                    QuestionDTO.responsePage questionDTORes = new QuestionDTO.responsePage(
                            1L+e,
                            "제목"+e,
                            "내용"+e,
                            "작성자",
                            0L,
                            0L,
                            LocalDateTime.now()
                    );
                    questionDTOList.add(questionDTORes);
                });

        Page<QuestionDTO.responsePage> questionPage = new PageImpl<>(
                questionDTOList,
                PageRequest.of(page-1, 5),
                questionDTOList.size()
                );
        System.out.println(questionPage.getContent());

        given(questionService.getQuestions(Mockito.anyInt())).willReturn(questionPage);

        ResultActions actions = mockMvc.perform(
                get("/question")
                        .param("page", String.valueOf(page))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON));
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("pageable.pageNumber").value(page-1))
                .andExpect(jsonPath("totalElements").value(totalElements))
                .andDo(
                        document(
                                "get-questions",
                                getResponsePreProcessor(),
                                requestParameters(parameterWithName("page").description("페이지")),
                                responseFields(
                                        List.of(
                                                fieldWithPath("content[].id").type(JsonFieldType.NUMBER).description("게시글 ID"),
                                                fieldWithPath("content[].title").type(JsonFieldType.STRING).description("글제목"),
                                                fieldWithPath("content[].contents").type(JsonFieldType.STRING).description("본문"),
                                                fieldWithPath("content[].userName").type(JsonFieldType.STRING).description("작성자"),
                                                fieldWithPath("content[].views").type(JsonFieldType.NUMBER).description("조회수"),
                                                fieldWithPath("content[].answers").type(JsonFieldType.NUMBER).description("답변수"),
                                                fieldWithPath("content[].createdAt").type(JsonFieldType.STRING).description("작성일"),
                                                fieldWithPath("pageable.sort.sorted").type(JsonFieldType.BOOLEAN).description("pageable sort sorted 정보"),
                                                fieldWithPath("pageable.sort.unsorted").type(JsonFieldType.BOOLEAN).description("pageable sort unsorted 정보"),
                                                fieldWithPath("pageable.sort.empty").type(JsonFieldType.BOOLEAN).description("pageable sort empty 정보"),
                                                fieldWithPath("pageable.pageNumber").type(JsonFieldType.NUMBER).description("pageable 넘버 정보"),
                                                fieldWithPath("pageable.pageSize").type(JsonFieldType.NUMBER).description("pageable 사이즈 정보"),
                                                fieldWithPath("pageable.offset").type(JsonFieldType.NUMBER).description("pageable sort 오프셋 정보"),
                                                fieldWithPath("pageable.paged").type(JsonFieldType.BOOLEAN).description("pageable sort paged 정보"),
                                                fieldWithPath("pageable.unpaged").type(JsonFieldType.BOOLEAN).description("unpaged"),
                                                fieldWithPath("totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수"),
                                                fieldWithPath("totalElements").type(JsonFieldType.NUMBER).description("총 데이터 수"),
                                                fieldWithPath("last").type(JsonFieldType.BOOLEAN).description("마지막 페이지"),
                                                fieldWithPath("numberOfElements").type(JsonFieldType.NUMBER).description("numberOfElements"),
                                                fieldWithPath("size").type(JsonFieldType.NUMBER).description("페이지 사이즈"),
                                                fieldWithPath("sort.sorted").type(JsonFieldType.BOOLEAN).description("정렬 sorted 정보"),
                                                fieldWithPath("sort.unsorted").type(JsonFieldType.BOOLEAN).description("정렬 unsorted 정보"),
                                                fieldWithPath("sort.empty").type(JsonFieldType.BOOLEAN).description("정렬 empty 정보"),
                                                fieldWithPath("first").type(JsonFieldType.BOOLEAN).description("첫번째 페이지"),
                                                fieldWithPath("number").type(JsonFieldType.NUMBER).description("number"),
                                                fieldWithPath("empty").type(JsonFieldType.BOOLEAN).description("empty")
                                        )
                                )
                        )
                );
    }

    @Test
    @WithMockUser
    public void patchMethod() throws Exception {

        Question question = new Question("제목","내용","작성자");
        question.setId(1L);
        QuestionDTO questionDTO = new QuestionDTO("글 제목", "글 내용","작성자");
        String content = gson.toJson(questionDTO);
        given(questionMapper.questionDTOToQuestion(Mockito.any(QuestionDTO.class))).willReturn(new Question());

        Long questionId = 1L;
        ResultActions actions = mockMvc.perform(
                patch("/question/{question_id}",questionId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));
        actions.andExpect(status().isResetContent())
                .andDo(document(
                "patch-question",
                getRequestPreProcessor(),
                requestFields(
                        fieldWithPath("title").description("수정할 글제목"),
                        fieldWithPath("contents").description("수정할 글내용"),
                        fieldWithPath("userName").description("작성자")
                )
        ));
    }
}
