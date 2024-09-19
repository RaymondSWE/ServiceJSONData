package com.raysafeassesment.server.service.Impl;

import com.raysafeassesment.server.exception.EntityNotFoundException;
import com.raysafeassesment.server.exception.ValidationException;
import com.raysafeassesment.server.model.MeasurementData;
import com.raysafeassesment.server.repository.MeasurementRepository;
import com.raysafeassesment.server.service.MeasurementService;
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

    private final MeasurementRepository measurementRepository;

    @Autowired
    public MeasurementServiceImpl(MeasurementRepository measurementRepository) {
        this.measurementRepository = measurementRepository;
    }

    @Override
    public boolean validationOfMeasurementData(MeasurementData data) {

        if (data.getTemperature() < MIN_TEMPERATURE || data.getTemperature() > MAX_TEMPERATURE) {
            throw new ValidationException("Temperature out of range, Please use within the range -1000 to 1000: " + data.getTemperature());
        }

        if (data.getPressure() < MIN_PRESSURE || data.getPressure() > MAX_PRESSURE) {
            throw new ValidationException("Pressure out of range, Please use within the range -1000 to 1000: " + data.getPressure());
        }

        if (data.getLength() < MIN_LENGTH || data.getLength() > MAX_LENGTH) {
            throw new ValidationException("Length out of range, Please use within the range -1000 to 1000: " + data.getLength());
        }

        if (data.getNoise() < MIN_NOISE || data.getNoise() > MAX_NOISE) {
            throw new ValidationException("Noise out of range, Please use within the range -1000 to 1000: " + data.getNoise());
        }

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

