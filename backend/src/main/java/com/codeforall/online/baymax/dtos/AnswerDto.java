package com.codeforall.online.baymax.dtos;

import jakarta.validation.constraints.NotNull;

/**
 * The Data Transfer Object (DTO) representing an answer.
 * This class is used to encapsulate the data related to an answer in a structured manner.
 * It ensures that the answer is not null using validation annotations.
 */
public class AnswerDto {

    @NotNull(message = "Answer is mandatory")
    private String answer;


    /**
     * Get the answer
     * @return the answer, which is guaranteed to be non-null due to validation.
     */
    public @NotNull(message = "Answer is mandatory") String getAnswer() {
        return answer;
    }

    /**
     * Set the answer
     * @param answer the answer to set, which must not be null.
     */
    public void setAnswer(@NotNull(message = "Answer is mandatory") String answer) {
        this.answer = answer;
    }
}


