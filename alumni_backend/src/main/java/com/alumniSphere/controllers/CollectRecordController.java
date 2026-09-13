package com.alumniSphere.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alumniSphere.dtos.AlumniRespDto;
import com.alumniSphere.dtos.DepartmentDto;
import com.alumniSphere.dtos.StudentResDto;
import com.alumniSphere.services.CollectRecordService;

@RestController
public class CollectRecordController {
	private CollectRecordService collRecServ;
	
	public CollectRecordController(CollectRecordService collRecServ) {
		this.collRecServ = collRecServ;
	}
	
	@GetMapping("/collect_all_department")
	public List<DepartmentDto> collectDepartment() {
		return collRecServ.collectAllDepartment();
	}
	
	@GetMapping("/collect_all_student")
	public List<StudentResDto> collectStudent(){
		return collRecServ.collectAllStudent();
	}
	
	@GetMapping("/collect_all_alumni")
	public List<AlumniRespDto> collectAlumni(){
		return collRecServ.collectAllAlumni();
	}
}
