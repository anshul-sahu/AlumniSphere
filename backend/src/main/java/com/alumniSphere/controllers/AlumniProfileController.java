package com.alumniSphere.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.alumniSphere.dtos.AlumniProfileDto;
import com.alumniSphere.entities.User;
import com.alumniSphere.services.AlumniProfileService;
import com.alumniSphere.dtos.ApiResponse;

import jakarta.validation.Valid;

@RestController
public class AlumniProfileController {
	
	private AlumniProfileService alumProfServ;
	
	public AlumniProfileController(AlumniProfileService alumProfServ) {
		this.alumProfServ = alumProfServ;
	}
	
	@GetMapping("/get_alumni/{userId}")
	public ResponseEntity<ApiResponse> getAlumni(@PathVariable Integer userId){
		AlumniProfileDto dto = alumProfServ.getAlumni(userId);
		return new ResponseEntity<>(new ApiResponse(true, "collected successfully", dto), HttpStatus.OK);
	}
	
	@PostMapping("alumniProfile/{userId}")
	public ResponseEntity<ApiResponse> profileCompletion(@Valid @RequestBody AlumniProfileDto alumniProf,@PathVariable Integer userId) {
		alumniProf.setUser(new User(userId));
		AlumniProfileDto dto = alumProfServ.saveAlumniProfile(alumniProf); 
		if(dto != null) {
			return new ResponseEntity<>(new ApiResponse(true, "alumni profile saved", dto), HttpStatus.OK);
		}
		return new ResponseEntity<>(new ApiResponse(false, "alumni profile not saved"), HttpStatus.INTERNAL_SERVER_ERROR);
		
	}
}
