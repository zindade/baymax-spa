package com.codeforall.online.baymax.services;

import com.codeforall.online.baymax.exceptions.*;
import com.codeforall.online.baymax.model.Medication;

import java.util.List;


/**
 * Common interface for customer services, provides methods to manage customers
 */
public interface MedicationService {

    /**
     * Get the customer with the given id
     * @param customerId the customer id
     * @return the customer
     */
    Medication get(int customerId) throws MedicationNotFoundException;


    Medication add(Medication medication);


    List<Medication> list() throws MedicationNotFoundException;


}