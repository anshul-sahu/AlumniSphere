package com.alumniSphere.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.alumniSphere.dtos.ApiResponse;
import com.alumniSphere.dtos.StudentProfileDto;
import com.alumniSphere.dtos.StudentProfileUpdateDto;
import com.alumniSphere.services.StudentProfileService;

import jakarta.validation.Valid;

@RestController
public class StudentProfileController {
	
	private StudentProfileService studProfServ;
	
	public StudentProfileController(StudentProfileService studProfServ) {
		this.studProfServ = studProfServ;
	}
	
	@PutMapping("/update_student")
	public ResponseEntity<ApiResponse> updateStudent(@Valid @RequestBody StudentProfileUpdateDto studProfUp){
		Boolean res = studProfServ.updateStudent(studProfUp);
		
		return new ResponseEntity<>(new ApiResponse(res, "collected successfully", null), HttpStatus.OK);
	}
	
	@GetMapping("/get_student/{userId}")
	public ResponseEntity<ApiResponse> getStudent(@PathVariable Integer userId){
		StudentProfileDto dto = studProfServ.getStudent(userId);
		return new ResponseEntity<>(new ApiResponse(true, "collected successfully", dto), HttpStatus.OK);
	}
	 
	@PostMapping("/save_student/{userId}")
	public ResponseEntity<ApiResponse> saveStudent(@Valid @RequestBody StudentProfileDto studDto,@PathVariable Integer userId) {
		StudentProfileDto stdDto = studProfServ.saveStudent(studDto, userId);
		
		if(stdDto != null) {
			return new ResponseEntity<>(new ApiResponse(true, "student saved", stdDto), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(new ApiResponse(false, "student not saved"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
