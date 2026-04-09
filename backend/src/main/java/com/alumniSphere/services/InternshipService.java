package com.alumniSphere.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumniSphere.dtos.CollectInternshipApplication;
import com.alumniSphere.dtos.InternshipDto;
import com.alumniSphere.dtos.StudentInternDto;
import com.alumniSphere.dtos.StudentInternshipApplicationDto;
import com.alumniSphere.dtos.UserAppDto;
import com.alumniSphere.entities.AlumniProfile;
import com.alumniSphere.entities.ApplicationStatus;
import com.alumniSphere.entities.Internship;
import com.alumniSphere.entities.InternshipApplication;
import com.alumniSphere.entities.StudentProfile;
import com.alumniSphere.entities.User;
import com.alumniSphere.repos.AlumniProfileRepo;
import com.alumniSphere.repos.InternshipApplicationRepo;
import com.alumniSphere.repos.InternshipRepo;
import com.alumniSphere.repos.StudentProfileRepo;
import com.alumniSphere.repos.UserRepo;

@Service
public class InternshipService {
	private InternshipRepo internRepo;
	private AlumniProfileRepo alumnProfRepo;
	private InternshipApplicationRepo internAppRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private StudentProfileRepo stdProfRepo;
	
	
	public InternshipService(InternshipRepo internRepo, AlumniProfileRepo alumnProfRepo, InternshipApplicationRepo internAppRepo) {
		this.internRepo = internRepo;
		this.alumnProfRepo = alumnProfRepo;
		this.internAppRepo = internAppRepo;
	}
	
	public List<CollectInternshipApplication> uploadedInternship(Integer userId) {
		AlumniProfile alumProf =  alumnProfRepo.findById(alumnProfRepo.findAlumniProfileIdByUserId(userId)).get();
		List<Internship> list = internRepo.findAllByAlumni(alumProf);
		
		List<CollectInternshipApplication> newList = new ArrayList<>();
		for(Internship next : list) {
			CollectInternshipApplication app = new CollectInternshipApplication();
			BeanUtils.copyProperties(next, app);
			app.setApplyDeadline(next.getApplyDeadline().toString());
			List<StudentInternshipApplicationDto> std = new ArrayList<>();
			List<InternshipApplication> appList =  internAppRepo.findAllApplicationsByInternship(next);
			
			for(InternshipApplication n : appList) {
				StudentInternshipApplicationDto stdInApp = new StudentInternshipApplicationDto();
				stdInApp.setStatus(n.getStatus());
				
				UserAppDto dto = new UserAppDto();
				BeanUtils.copyProperties(n.getUser(), dto);
				stdInApp.setUserAppDto(dto);
				
				StudentInternDto stdInternDto = new StudentInternDto();
				StudentProfile stdProf = stdProfRepo.findById(stdProfRepo.findStudentProfileIdByUserId(n.getUser().getUserId())).get();
				stdInternDto.setEnrollmentNo(stdProf.getEnrollmentNo());
				stdInternDto.setResumeUrlPath(stdProf.getResumeUrlPath());
				dto.setStdInDto(stdInternDto);
				
				std.add(stdInApp);
			}
			app.setInternApp(std);
			newList.add(app);
		}
		return newList;
		
	}
	
	public Boolean applyForInternship(Integer userId, Integer internshipId) {
		InternshipApplication internApp = new InternshipApplication();
		internApp.setInternship(internRepo.findById(internshipId).get());
		User user = userRepo.findById(userId).get();
		internApp.setUser(user);
		internApp.setStatus(ApplicationStatus.PENDING);
		InternshipApplication app = internAppRepo.save(internApp);
		
		return app != null;
	}
	
	public List<InternshipDto> collectAllInternship() {
		List<Internship> list =  internRepo.findAll();
		List<InternshipDto> newList = new ArrayList<>();
		
		for(Internship next : list) {
			InternshipDto dto = new InternshipDto();
			BeanUtils.copyProperties(next, dto);
			dto.setApplyDeadline(next.getApplyDeadline().toString());
			newList.add(dto);
		}
		return newList;
		
	}
	
	public Boolean saveInternship(InternshipDto dto, Integer userId) {
		Integer alumniProfileId = alumnProfRepo.findAlumniProfileIdByUserId(userId);
		Internship intern = new Internship();
		BeanUtils.copyProperties(dto, intern);
		intern.setAlumni(new AlumniProfile(alumniProfileId));
		intern.setCreatedAt(LocalDate.now());
		intern.setApplyDeadline(LocalDate.parse(dto.getApplyDeadline()));
		Internship newIntern = internRepo.save(intern);
		return newIntern != null;
	}
}
