package com.codeforall.online.baymax.persistence.managers;

/**
 * Common interface for a transaction manager
 */
public interface TransactionManager {

    /**
     * Begin a session to perform a read operation
     */
    void beginRead();

    /**
     * Begin a session to perform a write operation
     */
    void beginWrite();

    /**
     * Commit a transaction
     */
    void commit();

    /**
     * Rollback a transaction
     */
    void rollback();

    /**
     * Check if a transaction is active
     * @return true if the transaction is active and false if it is not
     */
    boolean isTransactionActive();
}
