package com.raysafeassesment.server.service.Impl;

import com.raysafeassesment.server.excpetion.ValidationException;
import com.raysafeassesment.server.model.MeasurementData;
import com.raysafeassesment.server.service.MeasurementService;

public class MeasurementServiceImpl implements MeasurementService {

    // the min and max is adjustable, for now i'll use these values for validation
    private static final double MIN_TEMPERATURE = -1000.00;
    private static final double MAX_TEMPERATURE = 1000.00;

    private static final double MIN_PRESSURE = -1000.00;
    private static final double MAX_PRESSURE = 1000.00;

    private static final double MIN_LENGTH = -1000.00;
    private static final double MAX_LENGTH = 1000.00;
    private static final double MIN_NOISE = -1000.00;
    private static final double MAX_NOISE = 1000.00;


    @Override
    public boolean validationOfMeasurementData(MeasurementData data) {
        if(data.getTemperature() < MIN_TEMPERATURE ||data.getTemperature() > MAX_TEMPERATURE)
            throw new ValidationException("Temperature out of range, Please use within the range -1000 to 1000: " + data.getTemperature());

        if(data.getPressure() < MIN_PRESSURE || data.getPressure() > MAX_PRESSURE)
            throw new ValidationException("Pressure out of range, Please use within the range -1000 to 1000: " + data.getPressure());

        if(data.getLength() < MIN_LENGTH ||data.getLength() > MAX_LENGTH)
            throw new ValidationException("Length out of range, Please use within the range -1000 to 1000: " + data.getLength());

        if(data.getNoise() < MIN_NOISE || data.getNoise() > MAX_NOISE)
            throw new ValidationException("Noise out of range, Please use within the range -1000 to 1000: " + data.getNoise());
        return true;
    }
}
