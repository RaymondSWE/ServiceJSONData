package com.raysafeassesment.server.service;

import com.raysafeassesment.server.model.MeasurementData;

import java.util.List;
import java.util.Optional;

public interface MeasurementService {

    boolean validationOfMeasurementData(MeasurementData data);
    MeasurementData createMeasurementData(MeasurementData data);

    Optional<MeasurementData> getMeasurementDataById(Long id);

    List<MeasurementData> getAllMeasurementData();

    MeasurementData updateMeasurementData(Long id, MeasurementData newData);

    boolean deleteMeasurementData(Long id);
}
