package com.stackoverflow.backend.question.service;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
class ViewEvent extends ApplicationEvent {
    private final String secureIp;
    private final Long question_id;
    public ViewEvent(Object source, Long question_id, String secureIp){
        super(source);
        this.question_id = question_id;
        this.secureIp = secureIp;
    }
}
