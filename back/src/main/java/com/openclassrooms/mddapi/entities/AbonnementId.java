package com.openclassrooms.mddapi.entities;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@Embeddable
public class AbonnementId implements Serializable {
    private int user;
    private int theme;

    public AbonnementId(int user, int theme) {
        this.user = user;
        this.theme = theme;
    }
}