package com.codeforall.online.baymax.converters;

import com.codeforall.online.baymax.dtos.AnswerDto;
import org.springframework.ai.chat.Generation;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * A converter that transforms a {@link Generation} object into an {@link AnswerDto}.
 */
@Component
public class GenerationToAnswerDto implements Converter<Generation, AnswerDto> {


    /**
     * Converts a {@link Generation} object into an {@link AnswerDto}.
     * @param generation the {@link Generation} object to convert.
     * @return an {@link AnswerDto} containing the converted answer.
     */
    @Override
    public AnswerDto convert(Generation generation) {
        AnswerDto answerDto = new AnswerDto();

        answerDto.setAnswer(generation.getOutput().getContent());
        return answerDto;
    }
}

