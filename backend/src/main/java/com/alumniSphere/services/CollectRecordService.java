package com.alumniSphere.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumniSphere.dtos.AlumniRespDto;
import com.alumniSphere.dtos.DepartmentDto;
import com.alumniSphere.dtos.StudentResDto;
import com.alumniSphere.entities.AlumniProfile;
import com.alumniSphere.entities.Department;
import com.alumniSphere.entities.StudentProfile;
import com.alumniSphere.repos.AlumniProfileRepo;
import com.alumniSphere.repos.DepartmentRepo;
import com.alumniSphere.repos.StudentProfileRepo;

@Service
public class CollectRecordService {
	@Autowired
	private AlumniProfileRepo alumProfRepo;
	
	@Autowired
	private StudentProfileRepo studProfRepo;
	
	@Autowired
	private DepartmentRepo departRepo;
	
	public List<DepartmentDto> collectAllDepartment(){
		List<Department> list = departRepo.findAll();
		List<DepartmentDto> newList = new ArrayList<>();
		for(Department next : list) {
			DepartmentDto dto = new DepartmentDto();
			BeanUtils.copyProperties(next, dto);
			newList.add(dto);
		}
		return newList;
	}
	
	public List<StudentResDto> collectAllStudent(){
		List<StudentProfile> list = studProfRepo.findAllWithRelations();
		List<StudentResDto> dtoList = new ArrayList<>();
		for(StudentProfile next : list) {
			StudentResDto dto = new StudentResDto();
			BeanUtils.copyProperties(next, dto);
			dto.setDepartmentName(next.getDepartment().getName());
			dtoList.add(dto); 
		}
		return dtoList;
	}
	public List<AlumniRespDto> collectAllAlumni(){
		List<AlumniProfile> list = alumProfRepo.findAllWithRelations();
		List<AlumniRespDto> dtoList = new ArrayList<>();
		for(AlumniProfile next : list) {
			AlumniRespDto dto = new AlumniRespDto();
			BeanUtils.copyProperties(next, dto);
			dto.setDepartmentName(next.getDepartment().getName());
			dtoList.add(dto);
		}
		return dtoList;
	}
}
