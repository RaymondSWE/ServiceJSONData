package com.raysafeassesment.server.model;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class RawSensorData {
    private double a;
    private double b;
    private double c;
    private double d;
    private double e;
    private double f;

    @NotNull(message = "Sensor G value is required")
    private String g;
}
