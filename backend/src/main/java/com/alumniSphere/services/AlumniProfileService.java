package com.alumniSphere.services;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.alumniSphere.dtos.AlumniProfileDto;
import com.alumniSphere.entities.AlumniProfile;
import com.alumniSphere.entities.Department;
import com.alumniSphere.repos.AlumniProfileRepo;
import com.alumniSphere.repos.DepartmentRepo;

@Service
public class AlumniProfileService {
	private AlumniProfileRepo alumniRepo;
	private DepartmentRepo departRepo;
	
	public AlumniProfileService(AlumniProfileRepo alumniRepo, DepartmentRepo departRepo) {
		this.alumniRepo = alumniRepo;
		this.departRepo = departRepo;
	}
	
	
	public AlumniProfileDto getAlumni(Integer userId) {
		AlumniProfile alumni =  alumniRepo.findByUser_userId(userId);	
		AlumniProfileDto spd = new AlumniProfileDto();
		BeanUtils.copyProperties(alumni, spd);
		Optional<Department> depart =  departRepo.findById(alumni.getDepartment().getDepartmentId());
		spd.setDepartmentName(depart.get().getName());
		return spd;
	}
	
	public AlumniProfileDto saveAlumniProfile(AlumniProfileDto alumniProfDto) {
		AlumniProfile alumniProfile = new AlumniProfile();
		BeanUtils.copyProperties(alumniProfDto, alumniProfile);
		alumniProfile.setDepartment(new Department(alumniProfDto.getDepartmentId()));
		AlumniProfileDto dto = new AlumniProfileDto();
		AlumniProfile profile = alumniRepo.save(alumniProfile);
		BeanUtils.copyProperties(profile, dto);
		return dto;
	}
}
