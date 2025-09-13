package com.codeforall.online.baymax.exceptions;

import com.codeforall.online.baymax.errors.ErrorMessage;

/**
 * Thrown to indicate that the customer was not found
 */
public class MedicationNotFoundException extends BaymaxException {

    /**
     * @see BaymaxException#BaymaxException(String)
     */
    public MedicationNotFoundException() {
        super(ErrorMessage.MEDICATION_NOT_FOUND);
    }
}
