package com.codeforall.online.baymax.functions.requests;

import com.fasterxml.jackson.annotation.JsonClassDescription;

/**
 * Represents a request for retrieving customer account information.
 * This class extends {@link AbstractInfoRequest} to inherit the necessary properties for
 * OpenAI API compatibility. It is annotated with {@link JsonClassDescription} to provide
 * metadata for JSON serialization and documentation purposes.
 */
@JsonClassDescription("Medication accounts information request")
public class AccountInfoRequest extends AbstractInfoRequest {
}
