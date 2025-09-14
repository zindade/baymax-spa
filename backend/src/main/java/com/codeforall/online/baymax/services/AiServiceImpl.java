package com.codeforall.online.baymax.services;

import com.codeforall.online.baymax.exceptions.MedicationNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.Generation;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;


import java.util.List;
import java.util.Map;

/**
 * Implementation of the {@link AiService} interface.
 */
@Service
public class AiServiceImpl implements AiService {

    private static final Logger log = LoggerFactory.getLogger(AiServiceImpl.class);

    @Value("${ai.rag_prompt_template}")
    private Resource ragPromptTemplate;

    @Value("${ai.prompt_template}")
    private Resource promptTemplate;

    @Value("${ai.prompt_template_fda}")
    private Resource promptTemplateWithData;

    @Value("${ai.function_prompt_template}")
    private Resource functionPromptTemplate;

    @Value("${ai.json_prompt_template}")
    private Resource jsonPromptTemplate;

    @Value("${ai.vision.worker}")
    private String visionWorkerUrl;

    @Value("${ai.prompt_template_medication}")
    private Resource promptTemplateMedication;

    private RestTemplate restTemplate = new RestTemplate();

    private ChatClient chatClient;
    private OpenAiChatOptions openAiChatOptions;
    private String FDA_API = "https://api.fda.gov/drug/label.json?search=active_ingredient:";


    @Override
    public Generation info(String question) {

        Prompt response = null;
        try {
            String query = getActiveIngredient(question);
            String url = FDA_API + query + "&limit=1";
            String result = restTemplate.getForObject(url, String.class);
            PromptTemplate promptTemp = new PromptTemplate(promptTemplateWithData);
            response = promptTemp.create(Map.of(
                    "input", question, "data", result));
        } catch (Exception e) {

            log.error("Error in info" + e.getMessage());
            PromptTemplate promptTemp = new PromptTemplate(promptTemplate);
            response = promptTemp.create(Map.of("input", question));
        }

        return chatClient.call(response).getResult();
    }

    @Override
    public Generation imageInfo(String question, String base64Image) {

        try {
            String visionPayload = TemplateLoader.fillTemplate(jsonPromptTemplate,
                    question,
                    base64Image);

            String visionResult = WebClient.create()
                    .post()
                    .uri(visionWorkerUrl)
                    .bodyValue(visionPayload)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            String[] chunks = visionResult.split("\u0000");
            String finalText = chunks[chunks.length - 1];
            finalText = finalText.replace("<image>", "");
            finalText = finalText.split("<</SYS>>")[1];

            log.info("Vision worker raw response: {}", finalText);

            return info(question + finalText);

        } catch (Exception e) {
            log.info("Error in image info" + e.getMessage());

            PromptTemplate promptTemp = new PromptTemplate(promptTemplate);
            Prompt response = promptTemp.create(Map.of("input", question));
            return chatClient.call(response).getResult();
        }
    }


    public String getActiveIngredient (String question) throws MedicationNotFoundException{
        //log.info("Getting active ingredient for question: {}", question);
        try {
            PromptTemplate ragPrompt = new PromptTemplate(ragPromptTemplate);
            Prompt prompt = ragPrompt.create(Map.of(
                    "input", question));

            String content = chatClient.call(prompt).getResult().getOutput().getContent();
            String query = content.trim().replace(" ", "+");
            //log.info("Query: {}", query);
            return query;
        }  catch (Exception e) {
            throw new MedicationNotFoundException();
        }
    }


    @Override
    public Generation medicationInfo(String activeIngredient, String question) {

        String formattedData;
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            List<String> dataList = objectMapper.readValue(question, new TypeReference<List<String>>() {});

            formattedData = String.join("\n- ", dataList);

            log.info("--- DADOS FORMATADOS PARA O PROMPT ---");
            log.info(formattedData);
            log.info("------------------------------------");

        } catch (JsonProcessingException e) {
            log.error("Error formating FDA data: " + e.getMessage());
            formattedData = question;
        }

        Prompt response = null;

        try{
            PromptTemplate promptTemp = new PromptTemplate(promptTemplateMedication);
            response = promptTemp.create(Map.of(
                    "input", activeIngredient, "data", formattedData
            ));
        }catch (Exception e){
            log.error("Error in info" + e.getMessage());
        }

        log.info(String.valueOf(response));

        return chatClient.call(response).getResult();
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
