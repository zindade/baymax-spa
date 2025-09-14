package com.codeforall.online.baymax.dtos;

import jakarta.validation.constraints.NotNull;

public class QuestionWithImageDto {
    @NotNull(message = "A prompt is mandatory")
    private String question;

    @NotNull(message = "An image is required")
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
