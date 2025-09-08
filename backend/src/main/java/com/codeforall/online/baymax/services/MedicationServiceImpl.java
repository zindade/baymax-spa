package com.codeforall.online.baymax.services;

import com.codeforall.online.baymax.exceptions.*;
import com.codeforall.online.baymax.model.Medication;
import com.codeforall.online.baymax.persistence.managers.TransactionManager;
import com.codeforall.online.baymax.persistence.daos.MedicationDao;
import jakarta.persistence.PersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * An {@link MedicationService} implementation
 */
@Service
public class MedicationServiceImpl implements MedicationService {

    private TransactionManager transactionManager;
    private MedicationDao medicationDao;

    @Override
    public Medication get(int medicationId) throws MedicationNotFoundException {

        return Optional.ofNullable(medicationDao.findById(medicationId)).orElseThrow(MedicationNotFoundException::new);
    }


    @Override
    public List<Medication> list() throws MedicationNotFoundException {

        List<Medication> medications = medicationDao.findAll();

        return medications;
    }


    @Override
    public Medication add(Medication medication) {
        Medication savedMedication = null;

        try {
            transactionManager.beginWrite();


            savedMedication = medicationDao.saveOrUpdate(medication);

            transactionManager.commit();

        } catch (PersistenceException e) {
            transactionManager.rollback();
        }

        return savedMedication;
    }

    @Autowired
    public void setMedicationDao(MedicationDao medicationDao) {
        this.medicationDao = medicationDao;
    }

}
