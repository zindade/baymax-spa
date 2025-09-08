package com.codeforall.online.baymax.controllers.rest;

import com.codeforall.online.baymax.converters.GenerationToAnswerDto;
import com.codeforall.online.baymax.dtos.AnswerDto;
import com.codeforall.online.baymax.dtos.QuestionDto;
import com.codeforall.online.baymax.exceptions.MedicationNotFoundException;
import com.codeforall.online.baymax.model.Medication;
import com.codeforall.online.baymax.services.AiService;
import com.codeforall.online.baymax.services.MedicationService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.ai.chat.Generation;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

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



    /*@RequestMapping(method = RequestMethod.POST, path = {"/ask-baymax"})
    public ResponseEntity<Generation> info(@Valid @RequestBody QuestionDto questionDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String question = questionDto.getQuestion(); // may be null
        String base64Image = questionDto.getImage(); // mandatory

        return new ResponseEntity<>(
                aiService.info(question, base64Image),
                HttpStatus.OK
        );
    }*/

    @RequestMapping(method = RequestMethod.POST, path = {"/medication/{mid}"})
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
}
