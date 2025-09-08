package com.codeforall.online.baymax.dtos;

import jakarta.validation.constraints.NotNull;

public class QuestionDto {
    @NotNull(message = "A prompt is mandatory")
    private String question;

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}

