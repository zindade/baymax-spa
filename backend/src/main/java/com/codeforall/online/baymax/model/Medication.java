package com.codeforall.online.baymax.model;

import jakarta.persistence.*;

/**
 * A class which represents a customer of the bank
 */
@Entity
@Table(name = "medications")
public class Medication extends AbstractModel {

    private String name;
    private String active_ingredient;
    private String purpose;

    public String name() {
        return name;
    }

    public String active_ingredient() {
        return active_ingredient;
    }

    public String getPurpose() {
        return purpose;
    }

    public void name(String name) {
        this.name = name;
    }

    public void active_ingredient(String active_ingredient) {
        this.active_ingredient = active_ingredient;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

}



