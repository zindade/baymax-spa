package com.codeforall.online.baymax.persistence.managers.jpa;

import com.codeforall.online.baymax.persistence.managers.SessionManager;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import org.springframework.stereotype.Component;

/**
 * A Session Manger implementation to use in a session-per-request pattern with JPA
 */
@Component
public class JpaSessionManager implements SessionManager<EntityManager> {

    private EntityManagerFactory emf;
    private EntityManager em;

    /**
     * @see SessionManager#startSession()
     */
    @Override
    public void startSession() {

        if(em == null){
            em = emf.createEntityManager();
        }
    }

    /**
     * @see SessionManager#stopSession()
     */
    @Override
    public void stopSession() {
        if(em != null){
            em.close();
        }

        em = null;
    }

    /**
     * @see SessionManager#getCurrentSession()
     */
    @Override
    public EntityManager getCurrentSession() {
        startSession();
        return em;
    }

    /**
     * Set the persistence unit
     * @param emf the entity manager factory to set
     */
    @PersistenceUnit
    public void setEmf(EntityManagerFactory emf) {
        this.emf = emf;
    }
}
