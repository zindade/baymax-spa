package com.codeforall.online.baymax.functions.responses;

public record MedicationInfoResponse(
        String name,
        String active_ingredient,
        String purpose
) implements InfoResponse { }