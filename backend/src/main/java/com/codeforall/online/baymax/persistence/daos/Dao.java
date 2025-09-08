package com.codeforall.online.baymax.persistence.daos;

import com.codeforall.online.baymax.model.Model;

import java.util.List;

/**
 * Base interface for data access objects, provides methods to manage models
 * @param <T> the model type
 */
public interface Dao<T extends Model> {

    /**
     * Get a set of the model type
     * @return the model list
     */
    List<T> findAll();

    /**
     * Get the model
     * @param id the model id
     * @return the model
     */
    T findById(Integer id);

    /**
     * Save or updates the model
     * @param modelObject the model to be saved or updated
     * @return the saved or updated model
     */
    T saveOrUpdate(T modelObject);

    /**
     * Delete the model
     * @param id the id of the model to be deleted
     */
    void delete(Integer id);
}
