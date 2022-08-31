package com.stackoverflow.backend.answertest;

import com.google.gson.Gson;
import com.stackoverflow.backend.answer.controller.AnswerController;
import com.stackoverflow.backend.answer.domain.Answer;
import com.stackoverflow.backend.answer.domain.AnswerDTO;
import com.stackoverflow.backend.answer.mapper.AnswerMapper;
import com.stackoverflow.backend.answer.service.AnswerService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static com.stackoverflow.backend.questiontest.ApiDocumentUtils.getRequestPreProcessor;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AnswerController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class AnswerTests {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private AnswerMapper answerMapper;
    @MockBean
    private AnswerService answerService;

//    @Test
//    public void postMethod() throws Exception{
//        AnswerDTO answerDTO = new AnswerDTO("내용");
//        String content = gson.toJson(answerDTO);
//        given(answerMapper.answerDTOToAnswer(Mockito.any(AnswerDTO.class))).willReturn(new Answer());
//        ResultActions actions = mockMvc.perform(
//                post("/answer")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(content));
//        actions.andExpect(status().isOk())
//                .andDo(document(
//                        "post-answer",
//                        getRequestPreProcessor(),
//                        requestFields(
//                                fieldWithPath("contents").description("글 내용")
//                        )
//                ));
//    }
//
}