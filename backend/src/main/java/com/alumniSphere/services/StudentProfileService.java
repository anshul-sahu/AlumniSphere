package com.alumniSphere.services;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.alumniSphere.dtos.StudentProfileDto;
import com.alumniSphere.dtos.StudentProfileUpdateDto;
import com.alumniSphere.entities.Department;
import com.alumniSphere.entities.StudentProfile;
import com.alumniSphere.entities.User;
import com.alumniSphere.repos.DepartmentRepo;
import com.alumniSphere.repos.StudentProfileRepo;

@Service
public class StudentProfileService {
	private StudentProfileRepo studProfRepo;
	private DepartmentRepo departRepo;
	
	
	public StudentProfileService(StudentProfileRepo studProfRepo, DepartmentRepo departRepo) {
		this.studProfRepo = studProfRepo;
		this.departRepo = departRepo;
	}
	
	public Boolean updateStudent(StudentProfileUpdateDto studProfUp) {
		Integer studentProfileId = studProfRepo.findStudentProfileIdByUserId(studProfUp.getUserId());
		System.out.println(studentProfileId+" from service");
		StudentProfile studProf = studProfRepo.findById(studentProfileId).get();
//		System.out.println(studentProfileId);
		studProf.setEnrollmentNo(studProfUp.getEnrollmentNo());
		studProf.setResumeUrlPath(studProfUp.getResumeUrlPath());
		studProf.setSkill(studProfUp.getSkill());
		studProf.setDepartment(departRepo.findById(studProfUp.getDepartmentId()).get());
//		studProf.setUser(new User(studProfUp.getUserId()));
		
		return studProfRepo.save(studProf) != null;
	}
	
	public StudentProfileDto getStudent(Integer userId) {
		StudentProfile stud =  studProfRepo.findByUser_userId(userId);	
		StudentProfileDto spd = new StudentProfileDto();
		BeanUtils.copyProperties(stud, spd);
		Optional<Department> depart =  departRepo.findById(stud.getDepartment().getDepartmentId());
		spd.setDepartmentName(depart.get().getName());
		return spd;
	}
	
	public StudentProfileDto saveStudent(StudentProfileDto studProfDto, Integer userId) {
		StudentProfile studProf = new StudentProfile();
		BeanUtils.copyProperties(studProfDto, studProf);
		studProf.setUser(new User(userId));
		studProf.setDepartment(new Department(studProfDto.getDepartmentId()));
		
		StudentProfile saveProfile = studProfRepo.save(studProf);
		StudentProfileDto newDto = new StudentProfileDto();
		BeanUtils.copyProperties(saveProfile, newDto);
		return newDto;
	}
}
