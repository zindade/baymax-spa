package com.codeforall.online.baymax.persistence.daos.jpa;

import com.codeforall.online.baymax.model.Model;
import com.codeforall.online.baymax.persistence.daos.Dao;
import com.codeforall.online.baymax.persistence.managers.jpa.JpaSessionManager;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * A generic jpa data access object to be used as a base for concrete jpa service implementations
 * @param <T> the model type
 * @see Dao
 */
public abstract class JpaGenericDao<T extends Model> implements Dao<T> {

    protected JpaSessionManager sm;
    protected Class<T> modelType;

    /**
     * Initialize a new JPA DAO instance given a model type
     * @param modelType the model type
     */
    public JpaGenericDao(Class<T> modelType) {
        this.modelType = modelType;
    }

    /**
     * Set the session manager
     * @param sm the session manager to set
     */
    @Autowired
    public void setSm(JpaSessionManager sm) {
        this.sm = sm;
    }

    /**
     * @see Dao#findAll()
     */
    @Override
    public List<T> findAll() {
        EntityManager em = sm.getCurrentSession();

        // Using criteria query
        /* CriteriaQuery<T> criteriaQuery = em.getCriteriaBuilder().createQuery(modelType);
        Root<T> root = criteriaQuery.from(modelType);
        return em.createQuery(criteriaQuery).getResultList();
         */

        return em.createQuery("from " + modelType.getSimpleName() + " order by id", modelType).getResultList();
    }

    /**
     * @see Dao#findById(Integer)
     */
    @Override
    public T findById(Integer id) {
        EntityManager em = sm.getCurrentSession();

        return em.find(modelType, id);
    }

    /**
     * @see Dao#saveOrUpdate(Model)
     */
    @Override
    public T saveOrUpdate(T modelObject) {
        EntityManager em = sm.getCurrentSession();

        return em.merge(modelObject);
    }

    /**
     * @see Dao#delete(Integer)
     */
    @Override
    public void delete(Integer id) {
        EntityManager em = sm.getCurrentSession();

        em.remove(em.find(modelType, id));
    }
}
