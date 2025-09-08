package com.codeforall.online.baymax.factories;

import org.springframework.ai.openai.OpenAiEmbeddingOptions;
import org.springframework.beans.factory.FactoryBean;

/**
 * Factory class for creating instances of {@link OpenAiEmbeddingOptions}.
 * This class implements the {@link FactoryBean} interface, which is part of Spring's factory design pattern.
 * It is responsible for creating and providing an {@link OpenAiEmbeddingOptions} object configured with the model
 * specified by the {@code model} property.
 */
public class OpenAiEmbeddingOptionsFactory implements FactoryBean<OpenAiEmbeddingOptions> {

    private String model;

    /**
     * Sets the model that will be used to create the {@link OpenAiEmbeddingOptions}.
     * This method should be called to specify the model to be used before requesting the
     * {@link OpenAiEmbeddingOptions} object.
     * @param model the model to set, which will be used in creating the embedding options.
     */
    public void setModel(String model) {
        this.model = model;
    }

    /**
     * Creates and returns an {@link OpenAiEmbeddingOptions} object with the configured model.
     * This method uses the builder pattern to construct an instance of {@link OpenAiEmbeddingOptions}
     * and sets the model provided via the {@code setModel} method.
     * @return a newly created {@link OpenAiEmbeddingOptions} object with the specified model.
     */
    @Override
    public OpenAiEmbeddingOptions getObject() {
        return OpenAiEmbeddingOptions.builder().withModel(model).build();
    }

    /**
     * Returns the type of object that this factory creates.
     * In this case, it returns the class type of {@link OpenAiEmbeddingOptions}.
     * @return the class type of {@link OpenAiEmbeddingOptions}.
     */
    @Override
    public Class<?> getObjectType() {
        return OpenAiEmbeddingOptions.class;
    }
}
