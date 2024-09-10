package com.raysafeassesment.server.controller;

import com.raysafeassesment.server.model.MeasurementData;
import com.raysafeassesment.server.service.MeasurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MeasurementController {

    private final MeasurementService measurementService;
    @Autowired
    public MeasurementController(MeasurementService measurementService) {
        this.measurementService = measurementService;
    }

    @PostMapping("/validate")
    public ResponseEntity<String> validateMeasurement(@RequestBody MeasurementData data) {
        measurementService.validationOfMeasurementData(data);

        return new ResponseEntity<>("Measurement is valid", HttpStatus.OK);
    }
}
