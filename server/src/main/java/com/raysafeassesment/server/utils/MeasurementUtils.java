package com.raysafeassesment.server.utils;

import com.raysafeassesment.server.exception.ValidationException;

public class MeasurementUtils {

    public static void validateRange(double value, double minValue, double maxValue, String fieldName) {
        if (value < minValue || value > maxValue) {
            throw new ValidationException(fieldName + " out of range, Please use within the range " + minValue + " to " + maxValue + ": " + value);
        }
    }

}
