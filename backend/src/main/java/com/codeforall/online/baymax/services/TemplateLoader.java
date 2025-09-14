package com.codeforall.online.baymax.services;

import org.springframework.core.io.Resource;

import java.nio.charset.StandardCharsets;
import java.nio.file.*;

public class TemplateLoader {

    public static String fillTemplate(Resource templatePath , String question, String imageBase64) throws Exception {
        String template = new String(templatePath.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

        return template
                .replace("${QUESTION}", question)
                .replace("${IMAGE_BASE64}", imageBase64);
    }
}

