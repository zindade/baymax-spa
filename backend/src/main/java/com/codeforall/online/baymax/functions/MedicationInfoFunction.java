package com.codeforall.online.baymax.functions;

import com.codeforall.online.baymax.functions.requests.MedicationInfoRequest;
import com.codeforall.online.baymax.functions.responses.MedicationInfoResponse;
import com.codeforall.online.baymax.model.Medication;

import java.util.function.Function;


public class MedicationInfoFunction implements Function<MedicationInfoRequest, MedicationInfoResponse> {

    private final Medication medication;

    public MedicationInfoFunction(Medication medication) {
        this.medication = medication;
    }

    public MedicationInfoResponse apply(MedicationInfoRequest medicationInfoRequest) {

        return new MedicationInfoResponse(medication.name(), medication.active_ingredient(), medication.getPurpose());
    }
}
