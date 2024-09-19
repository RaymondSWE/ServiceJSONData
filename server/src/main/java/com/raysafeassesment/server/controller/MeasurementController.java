package com.raysafeassesment.server.controller;

import com.raysafeassesment.server.model.MeasurementData;
import com.raysafeassesment.server.service.MeasurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/measurements")
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

    @PostMapping
    public  ResponseEntity<MeasurementData> createMeasurement(@RequestBody MeasurementData data) {
        MeasurementData newData = measurementService.createMeasurementData(data);
        return  new ResponseEntity<>(newData, HttpStatus.CREATED);

    }

    @GetMapping("{id}")
    public ResponseEntity<MeasurementData> getMeasurementById(@PathVariable Long id) {
        Optional<MeasurementData> measurementData = measurementService.getMeasurementDataById(id);
        return measurementData.map(ResponseEntity::ok)
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping
    public ResponseEntity<List <MeasurementData>> getAllMeasurements() {
        List<MeasurementData> allMeasurements = measurementService.getAllMeasurementData();
        return new ResponseEntity<>(allMeasurements, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MeasurementData> updateMeasurement(@PathVariable Long id, @RequestBody MeasurementData newData) {
        MeasurementData updatedData = measurementService.updateMeasurementData(id, newData);
        return new ResponseEntity<>(updatedData, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeasurement(@PathVariable Long id) {
        measurementService.deleteMeasurementData(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
