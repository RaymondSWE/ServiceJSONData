package com.raysafeassesment.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RawSensorData {
    private double a;
    private double b;
    private double c;
    private double d;
    private double e;
    private double f;
    private String g;

}
