package com.alumniSphere.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.alumniSphere.dtos.ApiResponse;
import com.alumniSphere.dtos.CollectInternshipApplication;
import com.alumniSphere.dtos.InternshipDto;
import com.alumniSphere.services.InternshipService;

import jakarta.validation.Valid;

@RestController
public class InternshipController {
	
	private InternshipService internServ;
	
	public InternshipController(InternshipService internServ) {
		this.internServ = internServ;
	}
	
	@GetMapping("/uploaded_internship/{userId}")
	public ResponseEntity<ApiResponse> uploadedInternship(@PathVariable Integer userId){
		List<CollectInternshipApplication> list = internServ.uploadedInternship(userId);
		return new ResponseEntity<>(new ApiResponse(true,"list", list ), HttpStatus.OK);
	}
	
	@PostMapping("/apply_for_internship/{userId}/{internshipId}")
	public ResponseEntity<ApiResponse> applyForInternship(@PathVariable Integer userId,@PathVariable Integer internshipId){
		
		Boolean flag = internServ.applyForInternship(userId, internshipId);
		if(flag) {
			return new ResponseEntity<>(new ApiResponse(true, "applied Successfully", null), HttpStatus.OK);			
		}else {
			return new ResponseEntity<>(new ApiResponse(false, "not applied", null), HttpStatus.OK);			
		}
	}
	
	@GetMapping("/student/internships")
	public ResponseEntity<ApiResponse> collectAllInternship(){
		List<InternshipDto> list = internServ.collectAllInternship();
		return new ResponseEntity<>(new ApiResponse(true, "responsed successfully", list), HttpStatus.OK);
	}
	
	@PostMapping("/upload/internship/{userId}")
	public ResponseEntity<ApiResponse> uploadInternship(@Valid @RequestBody InternshipDto internDto, @PathVariable Integer userId) {
		System.out.println(internDto);
		Boolean flag = internServ.saveInternship(internDto, userId);
		if(flag) {
			return new ResponseEntity<>(new ApiResponse(flag, "internship saved successfully", null), HttpStatus.OK);
		}else {			
		return new ResponseEntity<>(new ApiResponse(flag, "internship not saved ", null), HttpStatus.OK);
		}
	}
}
