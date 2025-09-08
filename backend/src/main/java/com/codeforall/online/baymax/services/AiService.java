package com.codeforall.online.baymax.services;

import com.codeforall.online.baymax.model.Medication;
import org.springframework.ai.chat.Generation;
import org.springframework.ai.chat.prompt.Prompt;

public interface AiService {


    Generation info(String question);

    Generation medicationInfo(Medication medication, String question);
}
