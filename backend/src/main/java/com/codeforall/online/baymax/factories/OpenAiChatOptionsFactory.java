package com.codeforall.online.baymax.factories;

import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.beans.factory.FactoryBean;

/**
 * A factory for creating and configuring {@link OpenAiChatOptions} instances.
 * This class implements {@link FactoryBean}, allowing it to integrate with Spring's
 * dependency injection mechanism to produce fully configured {@link OpenAiChatOptions} objects.
 * The options include the model name and temperature, which control the behavior of the OpenAI Chat system.
 */
public class OpenAiChatOptionsFactory implements FactoryBean<OpenAiChatOptions> {

    private String model;
    private Float temperature;
    private Integer maxTokens;

    /**
     * Creates and returns a fully configured instance of {@link OpenAiChatOptions}.
     * The options are built using the specified model and temperature values.
     * @return an instance of {@link OpenAiChatOptions} with the configured properties.
     */
    @Override
    public OpenAiChatOptions getObject() throws Exception {
        return OpenAiChatOptions.builder()
                .withModel(model)
                .withTemperature(temperature)
                .withMaxTokens(maxTokens)
                .build();
    }

    /**
     * Gets the type of object created by this factory.
     * @return the {@link Class} type of the objects produced, which is {@link OpenAiChatOptions}.
     */
    @Override
    public Class<?> getObjectType() {
        return OpenAiChatOptions.class;
    }

    /**
     * Sets the model to be used in the {@link OpenAiChatOptions}.
     * @param model the name of the AI model (e.g., "gpt-3.5-turbo").
     */
    public void setModel(String model) {
        this.model = model;
    }

    /**
     * Sets the temperature for the {@link OpenAiChatOptions}.
     * Temperature determines the variability of the AI's responses:
     * higher values (e.g., 0.8) lead to more creative and diverse outputs,
     * while lower values (e.g., 0.2) produce more focused and deterministic results.
     * @param temperature the randomness level (typically between 0.0 and 1.0).
     */
    public void setTemperature(Float temperature) {
        this.temperature = temperature;
    }

    public void setMaxTokens(String maxTokens) { this.maxTokens = Integer.parseInt(maxTokens); }
}
