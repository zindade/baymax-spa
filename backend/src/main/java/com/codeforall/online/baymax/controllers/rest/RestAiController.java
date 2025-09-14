package com.codeforall.online.baymax.controllers.rest;

import com.codeforall.online.baymax.converters.GenerationToAnswerDto;
import com.codeforall.online.baymax.dtos.QuestionDto;
import com.codeforall.online.baymax.dtos.QuestionWithImageDto;
import com.codeforall.online.baymax.services.AiService;
import com.codeforall.online.baymax.services.MedicationService;
import jakarta.validation.Valid;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.Generation;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * A REST API AI Controller responsible for rendering AI responses
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class RestAiController {

    private AiService aiService;
    private GenerationToAnswerDto generationToAnswerDto;
    private MedicationService medicationService;
    private ChatClient chatClient;

    @RequestMapping(method = RequestMethod.POST, path = {"/ask-baymax"})
    public ResponseEntity<Generation> info(@Valid @RequestBody QuestionDto questionDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String question = questionDto.getQuestion(); // may be null


        return new ResponseEntity<>(
                aiService.info(question),
                HttpStatus.OK
        );
    }



    @RequestMapping(method = RequestMethod.POST, path = {"/show-baymax"})
    public ResponseEntity<Generation> info(
            @Valid @RequestBody QuestionWithImageDto questionDto,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }

        // Pass directly to service
        Generation result = aiService.imageInfo(questionDto.getQuestion(), questionDto.getImage());

        return ResponseEntity.ok(result);
    }

    /*@RequestMapping(method = RequestMethod.POST, path = {"/medication/{mid}"})
    public ResponseEntity<AnswerDto> customer(@Valid @RequestBody QuestionDto questionDto, BindingResult bindingResult, @PathVariable Integer mid) {

        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Medication medication = null;

        try {
            medication = medicationService.get(mid);

        } catch (MedicationNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(generationToAnswerDto.convert(aiService.medicationInfo(medication, questionDto.getQuestion())), HttpStatus.OK);
    }*/

    @RequestMapping(method = RequestMethod.POST, path = {"/medication/active-ingredient"})
    public ResponseEntity<List<String>> getActiveIngredient(@RequestBody Map<String, String> payload) {
        String medicineName = payload.get("name");

        String prompt = "Responde apenas com o(s) nome(s) do(s) princípio(s) ativo(s) em inglês (nome usado nos EUA) "
                + "do medicamento \"" + medicineName + "\". "
                + "Não escrevas mais nada, sem frases, só os nomes separados por vírgula.";

        String result = chatClient
                .call(new Prompt(prompt))
                .getResult()
                .getOutput()
                .getContent()
                .trim();

        List<String> activeIngredients =  Arrays.stream(result.split(","))
                .map(String::trim)
                .toList();

        return ResponseEntity.ok(activeIngredients);
    }
    @RequestMapping(method = RequestMethod.POST, path = {"/medication/active-ingredient/{ai}"})
    public ResponseEntity<Generation> medicamentInfo(
            @Valid @RequestBody QuestionDto questionDto,
            @PathVariable("ai") String ai,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }

        Generation result = aiService.medicationInfo(ai, questionDto.getQuestion());

        return ResponseEntity.ok(result);
    }



    @Autowired
    public void setAiService(AiService aiService) {
        this.aiService = aiService;
    }

    @Autowired
    public void setMedicationService(MedicationService medicationService) {
        this.medicationService = medicationService;
    }

    @Autowired
    public void setGenerationToAnswerDto(GenerationToAnswerDto generationToAnswerDto) {
        this.generationToAnswerDto = generationToAnswerDto;
    }

    @Autowired
    public void setChatClient(ChatClient chatClient) {
        this.chatClient = chatClient;
    }
}
