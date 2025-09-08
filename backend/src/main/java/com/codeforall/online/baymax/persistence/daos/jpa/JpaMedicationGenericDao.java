package com.codeforall.online.baymax.persistence.daos.jpa;

import com.codeforall.online.baymax.model.Medication;
import com.codeforall.online.baymax.persistence.daos.MedicationDao;
import org.springframework.stereotype.Repository;

/**
 * A JPA {@link MedicationDao} implementation
 */
@Repository
public class JpaMedicationGenericDao extends JpaGenericDao<Medication> implements MedicationDao {

    /**
     * @see JpaGenericDao#JpaGenericDao(Class)
     */
    public JpaMedicationGenericDao() {
        super(Medication.class);
    }
}
