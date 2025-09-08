package com.codeforall.online.baymax.dtos;

import jakarta.validation.constraints.NotNull;

public class QuestionDto {

    private String question;

    @NotNull(message = "An image is mandatory")
    private String image;

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}

