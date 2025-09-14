package com.codeforall.online.baymax.services;

import com.codeforall.online.baymax.exceptions.MedicationNotFoundException;
import org.springframework.ai.chat.Generation;

public interface AiService {


    Generation info(String question);

    Generation medicationInfo(String medicationName, String question);

    Generation imageInfo(String question, String base64Image);

    String getActiveIngredient(String question) throws MedicationNotFoundException;
}
