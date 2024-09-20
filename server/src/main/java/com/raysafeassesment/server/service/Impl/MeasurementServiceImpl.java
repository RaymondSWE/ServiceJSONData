package com.raysafeassesment.server.service.Impl;

import com.raysafeassesment.server.exception.EntityNotFoundException;
import com.raysafeassesment.server.exception.ValidationException;
import com.raysafeassesment.server.model.MeasurementData;
import com.raysafeassesment.server.model.RawSensorData;
import com.raysafeassesment.server.repository.MeasurementRepository;
import com.raysafeassesment.server.service.MeasurementService;
import com.raysafeassesment.server.utils.MeasurementUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MeasurementServiceImpl implements MeasurementService {

    private static final double MIN_TEMPERATURE = -1000.00;
    private static final double MAX_TEMPERATURE = 1000.00;
    private static final double MIN_PRESSURE = -1000.00;
    private static final double MAX_PRESSURE = 1000.00;
    private static final double MIN_LENGTH = -1000.00;
    private static final double MAX_LENGTH = 1000.00;
    private static final double MIN_NOISE = -1000.00;
    private static final double MAX_NOISE = 1000.00;
    private static final double MIN_SENSOR_VALUE = -1000.00;
    private static final double MAX_SENSOR_VALUE = 1000.00;

    private final MeasurementRepository measurementRepository;

    @Autowired
    public MeasurementServiceImpl(MeasurementRepository measurementRepository) {
        this.measurementRepository = measurementRepository;
    }

    @Override
    public boolean validationOfMeasurementData(MeasurementData data) {

        MeasurementUtils.validateRange(data.getTemperature(), MIN_TEMPERATURE, MAX_TEMPERATURE, "Temperature");
        MeasurementUtils.validateRange(data.getPressure(), MIN_PRESSURE, MAX_PRESSURE, "Pressure");
        MeasurementUtils.validateRange(data.getLength(), MIN_LENGTH, MAX_LENGTH, "Length");
        MeasurementUtils.validateRange(data.getNoise(), MIN_NOISE, MAX_NOISE, "Noise");

        RawSensorData sensorData = data.getRawSensorData();
        MeasurementUtils.validateRange(sensorData.getA(), MIN_SENSOR_VALUE, MAX_SENSOR_VALUE, "Sensor A");
        MeasurementUtils.validateRange(sensorData.getB(), MIN_SENSOR_VALUE, MAX_SENSOR_VALUE, "Sensor B");
        MeasurementUtils.validateRange(sensorData.getC(), MIN_SENSOR_VALUE, MAX_SENSOR_VALUE, "Sensor C");
        MeasurementUtils.validateRange(sensorData.getD(), MIN_SENSOR_VALUE, MAX_SENSOR_VALUE, "Sensor D");
        MeasurementUtils.validateRange(sensorData.getE(), MIN_SENSOR_VALUE, MAX_SENSOR_VALUE, "Sensor E");
        MeasurementUtils.validateRange(sensorData.getF(), MIN_SENSOR_VALUE, MAX_SENSOR_VALUE, "Sensor F");

        return true;
    }

    @Override
    public MeasurementData createMeasurementData(MeasurementData data) {
        validationOfMeasurementData(data);
        return measurementRepository.save(data);
    }

    @Override
    public Optional<MeasurementData> getMeasurementDataById(Long id) {
        return measurementRepository.findById(id);
    }

    @Override
    public List<MeasurementData> getAllMeasurementData() {
        return measurementRepository.findAll();

    }

    @Override
    public MeasurementData updateMeasurementData(Long id, MeasurementData newData) {
        return measurementRepository.findById(id).map(existingData -> {
            existingData.setSerial(newData.getSerial());
            existingData.setTemperature(newData.getTemperature());
            existingData.setPressure(newData.getPressure());
            existingData.setLength(newData.getLength());
            existingData.setNoise(newData.getNoise());
            existingData.setRawSensorData(newData.getRawSensorData());
            existingData.setTimestamp(newData.getTimestamp());

            validationOfMeasurementData(existingData);

            return measurementRepository.save(existingData);
        }).orElseThrow(() -> new EntityNotFoundException("Measurement ID not found" + id));
    }

    @Override
    public boolean deleteMeasurementData(Long id) {
        return measurementRepository.findById(id)
                .map(data -> {
                    measurementRepository.delete(data);
                    return true;
                }).orElseThrow(() -> new EntityNotFoundException("Measurement ID not found: " + id));
        }
}

