package com.trg.booking2.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trg.booking2.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
