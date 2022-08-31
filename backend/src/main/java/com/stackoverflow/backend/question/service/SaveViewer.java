package com.stackoverflow.backend.question.service;

import com.stackoverflow.backend.question.domain.Question;
import com.stackoverflow.backend.question.domain.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SaveViewer {
    private final QuestionRepository questionRepository;

    @EventListener
    public void saveViewer(ViewEvent viewEvent){
        Question question = questionRepository.findById(viewEvent.getQuestion_id()).orElse(null);
        if(question.getViewers().contains(viewEvent.getSecureIp())) return;
        question.addViewCount();
        question.addViewer(viewEvent.getSecureIp());
        questionRepository.save(question);
    }
}
