package com.raysafeassesment.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeasurementData {
    private int id;
    private LocalDateTime timestamp;
    private String serial;
    private RawSensorData rawSensorData;
    private double temperature;
    private double pressure;
    private double length;
    private double noise;

}
