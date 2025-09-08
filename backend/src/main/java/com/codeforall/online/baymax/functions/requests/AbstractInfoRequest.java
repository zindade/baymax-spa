package com.codeforall.online.baymax.functions.requests;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Abstract base class for request objects that interact with OpenAI.
 * This class includes a workaround for compatibility between OpenAI's API requirements
 * and Jackson's JSON serialization behavior. OpenAI requires a "properties" object
 * to be included in requests, but Jackson does not generate an empty "properties" object
 * by default. The {@code dummy} field serves as a placeholder to ensure the object
 * is generated and satisfies the API requirements.
 */
public class AbstractInfoRequest {

    @JsonProperty(required = false)
    String dummy;
}
