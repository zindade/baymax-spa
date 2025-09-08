package com.codeforall.online.baymax.persistence.managers;

import jakarta.persistence.EntityManager;

/**
 * Common interface for a Session Manager
 * @param <T>
 */
public interface SessionManager<T> {

    /**
     * Start a session
     */
    void startSession();

    /**
     * Stop a session
     */
    void stopSession();

    /**
     * Get the current session
     * @return an entity manager to perform the requests to the database
     */
    EntityManager getCurrentSession();
}
