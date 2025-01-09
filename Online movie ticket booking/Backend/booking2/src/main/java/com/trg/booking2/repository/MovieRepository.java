package com.trg.booking2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trg.booking2.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie,Long>{

}
