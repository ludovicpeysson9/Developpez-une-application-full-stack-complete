package com.openclassrooms.mddapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "abonnements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Abonnement {
    @EmbeddedId
    private AbonnementId id;

    @ManyToOne
    @MapsId("user")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("theme")
    @JoinColumn(name = "theme_id", nullable = false)
    private Theme theme;
}