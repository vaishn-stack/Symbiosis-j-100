package com.trg.booking2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trg.booking2.entity.Movie;
import com.trg.booking2.repository.MovieRepository;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins="http://localhost:4200")
public class MovieController {
	@Autowired
    private MovieRepository movieRepository;
	
	 @GetMapping
	    public List<Movie> getAllMovies() {
	        return movieRepository.findAll();
	    }

	    @PostMapping
	    public Movie createMovie(@RequestBody Movie movie) {
	    	
	        return movieRepository.save(movie);
	    }
	    
		 
		 @GetMapping("/{id}")
		    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
		        return movieRepository.findById(id)
		                .map(ResponseEntity::ok)
		                .orElse(ResponseEntity.notFound().build());
		    }
		 
	    @PutMapping("/{id}")
	    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie updatedMovie) {
	        return movieRepository.findById(id)
	                .map(movie -> {
	                    movie.setGenre(updatedMovie.getGenre());
	                    movie.setName(updatedMovie.getName());
	                    return ResponseEntity.ok(movieRepository.save(movie));
	                })
	                .orElse(ResponseEntity.notFound().build());
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
	        if (movieRepository.existsById(id)) {
	            movieRepository.deleteById(id);
	            return ResponseEntity.noContent().build();
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
}
