package com.codeforall.online.baymax.persistence.managers.jpa;

import com.codeforall.online.baymax.persistence.managers.TransactionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * An implementation of the transaction manager to work with JPA
 */
@Component
public class JpaTransactionManager implements TransactionManager {

    private JpaSessionManager sm;

    /**
     * @see TransactionManager#beginRead()
     */
    @Override
    public void beginRead() {
        sm.startSession();
    }

    /**
     * @see TransactionManager#beginWrite()
     */
    @Override
    public void beginWrite() {
        if(!isTransactionActive()) {
            sm.getCurrentSession().getTransaction().begin();
        }
    }

    /**
     * @see TransactionManager#commit()
     */
    public void commit() {

        if(isTransactionActive()) {
            sm.getCurrentSession().getTransaction().commit();
        }

        sm.stopSession();
    }

    /**
     * @see TransactionManager#rollback()
     */
    public void rollback() {

        if(isTransactionActive()) {
            sm.getCurrentSession().getTransaction().rollback();
        }

        sm.stopSession();
    }

    /**
     * @see TransactionManager#isTransactionActive()
     */
    public boolean isTransactionActive() {
        return sm.getCurrentSession().getTransaction().isActive();
    }

    /**
     * Set a session manager
     * @param sm a session manager to set
     */
    @Autowired
    public void setSm(JpaSessionManager sm) {
        this.sm = sm;
    }
}
