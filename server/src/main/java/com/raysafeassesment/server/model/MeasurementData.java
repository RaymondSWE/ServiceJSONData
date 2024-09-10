package com.raysafeassesment.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MeasurementData {
    private int id;
    private String timestamp;
    private String serial;
    private RawSensorData rawSensorData;
    private double temperature;
    private double pressure;
    private double length;
    private double noise;

}
