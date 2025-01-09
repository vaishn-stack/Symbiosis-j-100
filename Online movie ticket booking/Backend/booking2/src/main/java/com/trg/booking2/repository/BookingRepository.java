package com.trg.booking2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trg.booking2.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>
{

}
