package com.alumniSphere.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.alumniSphere.dtos.AchievementDto;
import com.alumniSphere.dtos.ApiResponse;
import com.alumniSphere.dtos.CertificationDto;
import com.alumniSphere.dtos.EducationDto;
import com.alumniSphere.dtos.ProjectDto;
import com.alumniSphere.dtos.StudentInternshipStatusDto;
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
	
	
	@PostMapping("/add_achievement/{userId}")
	public ResponseEntity<ApiResponse> addAchievement(@PathVariable("userId") Integer userId ,@RequestBody AchievementDto achievementDto){
		
		Boolean achSaveStatus = studProfServ.saveAchievement(achievementDto, userId);
		
		if(achSaveStatus)
		return new ResponseEntity<>(new ApiResponse(true, "education uploaded suuccessfully",null),HttpStatus.OK);
		else
			return new ResponseEntity<>(new ApiResponse(false, "education not uploaded",null),HttpStatus.OK);
	}
	
	@GetMapping("/get_achievement/{userId}")
	public ResponseEntity<ApiResponse> collectUserAchievement(@PathVariable("userId") Integer userId){
		List<AchievementDto> dtos =  studProfServ.collectUserAchievement(userId);
		
		return new ResponseEntity<>(new ApiResponse(true, "education collected",dtos),HttpStatus.OK);
	}
	
	
	@PostMapping("/add_certification/{userId}")
	public ResponseEntity<ApiResponse> addNewCertification(@PathVariable("userId") Integer userId ,@RequestBody CertificationDto certDto){
		
		Boolean certSaveStatus = studProfServ.saveCertification(certDto, userId);
		
		if(certSaveStatus)
			return new ResponseEntity<>(new ApiResponse(true, "education uploaded suuccessfully",null),HttpStatus.OK);
		else
			return new ResponseEntity<>(new ApiResponse(false, "education not uploaded",null),HttpStatus.OK);
	}
	
	@GetMapping("/get_certification/{userId}")
	public ResponseEntity<ApiResponse> collectUserCertification(@PathVariable("userId") Integer userId){
		List<CertificationDto> dtos =  studProfServ.collectUserCertification(userId);
		
		return new ResponseEntity<>(new ApiResponse(true, "education collected",dtos),HttpStatus.OK);
	}
	
	@PostMapping("/add_education/{userId}")
	public ResponseEntity<ApiResponse> addNewEducation(@PathVariable("userId") Integer userId ,@RequestBody EducationDto educationDto){
		
		Boolean eduSaveStatus = studProfServ.saveEducation(educationDto, userId);
		
		if(eduSaveStatus)
		return new ResponseEntity<>(new ApiResponse(true, "education uploaded suuccessfully",null),HttpStatus.OK);
		else
			return new ResponseEntity<>(new ApiResponse(false, "education not uploaded",null),HttpStatus.OK);
	}
	
	@GetMapping("/get_education/{userId}")
	public ResponseEntity<ApiResponse> collectUserEducation(@PathVariable("userId") Integer userId){
		List<EducationDto> dtos =  studProfServ.collectUserEducation(userId);
		
		return new ResponseEntity<>(new ApiResponse(true, "education collected",dtos),HttpStatus.OK);
	}
	
	@GetMapping("/get_project/{userId}")
	public ResponseEntity<ApiResponse> collectUserProject(@PathVariable("userId") Integer userId){
		List<ProjectDto> dtos =  studProfServ.collectUserProject(userId);
		
		return new ResponseEntity<>(new ApiResponse(true, "project collected",dtos),HttpStatus.OK);
	}
	
	@PostMapping("/add_project/{userId}")
	public ResponseEntity<ApiResponse> addNewProject(@PathVariable("userId") Integer userId ,@RequestBody ProjectDto projectDto){
		
		Boolean projSaveStatus = studProfServ.saveProject(projectDto, userId);
		
		if(projSaveStatus)
		return new ResponseEntity<>(new ApiResponse(true, "project uploaded suuccessfully",null),HttpStatus.OK);
		else
			return new ResponseEntity<>(new ApiResponse(false, "project not uploaded",null),HttpStatus.OK);
	}
	
	@GetMapping("/student_applied_internship/{userId}")
	public ResponseEntity<ApiResponse> collectAppliedInternship(@PathVariable("userId") String userId){
		
		return new ResponseEntity<>(new ApiResponse(false, "applied succesfully",null),HttpStatus.OK);
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
	public ResponseEntity<ApiResponse> saveStudent(@Valid @RequestBody StudentProfileDto studDto,@PathVariable Integer userId){
		StudentProfileDto stdDto = studProfServ.saveStudent(studDto, userId);
		
		if(stdDto != null) {			
			return new ResponseEntity<>(new ApiResponse(true, "student saved", stdDto), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(new ApiResponse(false, "student not saved"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
