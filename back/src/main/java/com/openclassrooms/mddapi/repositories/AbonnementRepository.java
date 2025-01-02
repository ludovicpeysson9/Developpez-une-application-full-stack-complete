package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.entities.Abonnement;
import com.openclassrooms.mddapi.entities.AbonnementId;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AbonnementRepository extends JpaRepository<Abonnement, AbonnementId> {
    List<Abonnement> findByUserId(Integer userId);
}