package com.raysafeassesment.server.repository;

import com.raysafeassesment.server.model.MeasurementData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeasurementRepository extends JpaRepository<MeasurementData, Long> {

}
