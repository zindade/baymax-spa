package com.codeforall.online.baymax.functions.requests;

import com.fasterxml.jackson.annotation.JsonClassDescription;

/**
 * Represents a request for retrieving customer information.
 * This class extends {@link AbstractInfoRequest} to inherit the necessary properties for
 * OpenAI API compatibility. It is annotated with {@link JsonClassDescription} to provide
 * metadata for JSON serialization and documentation purposes.
 */
@JsonClassDescription("Medication information request")
public class MedicationInfoRequest extends AbstractInfoRequest {
}