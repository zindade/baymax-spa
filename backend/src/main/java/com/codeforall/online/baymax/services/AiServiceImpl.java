package com.codeforall.online.baymax.services;

import com.codeforall.online.baymax.functions.MedicationInfoFunction;
import com.codeforall.online.baymax.model.Medication;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.messages.Media;
import org.springframework.ai.chat.Generation;
import org.springframework.ai.chat.messages.ChatMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.model.function.FunctionCallbackWrapper;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeType;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Implementation of the {@link AiService} interface.
 */
@Service
public class AiServiceImpl implements AiService {

    @Value("${ai.rag_prompt_template}")
    private Resource ragPromptTemplate;
    @Value("${ai.function_prompt_template}")
    private Resource functionPromptTemplate;
    @Value("${ai.json_prompt_template}")
    private Resource jsonPromptTemplate;

    private ChatClient chatClient;
    private OpenAiChatOptions openAiChatOptions;



    @Override
    public Generation info(String question, String base64Image) {

        SystemMessage systemMsg = new SystemMessage("");

        List<Media> mediaList = List.of(new Media(MimeType.valueOf("image/webp"), base64Image));
        UserMessage userMsg = new UserMessage(question, mediaList);

        Prompt prompt = new Prompt(List.of(systemMsg, userMsg), openAiChatOptions);

        return chatClient.call(prompt).getResult();
    }


    @Override
    public Generation medicationInfo(Medication medication, String question) {
        OpenAiChatOptions chatOptions = OpenAiChatOptions.builder()
                .withFunctionCallbacks(List.of(
                        FunctionCallbackWrapper.builder(new MedicationInfoFunction(medication))
                                .withName("MedicationInfo")
                                .withDescription("Get details for a medication")
                                .build()
                )).build();

        PromptTemplate promptTemplate = new PromptTemplate(functionPromptTemplate);
        Message message = promptTemplate.createMessage(Map.of("input", question));
        Prompt prompt = new Prompt(message, chatOptions);

        return chatClient.call(prompt).getResult();
    }

    @Autowired
    public void setChatClient(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @Autowired
    public void setOpenAiChatOptions(OpenAiChatOptions openAiChatOptions) {
        this.openAiChatOptions = openAiChatOptions;
    }

}
