package com.alumniSphere.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.alumniSphere.dtos.AchievementDto;
import com.alumniSphere.dtos.CertificationDto;
import com.alumniSphere.dtos.EducationDto;
import com.alumniSphere.dtos.ProjectDto;
import com.alumniSphere.dtos.StudentProfileDto;
import com.alumniSphere.dtos.StudentProfileUpdateDto;
import com.alumniSphere.entities.Achievement;
import com.alumniSphere.entities.Certification;
import com.alumniSphere.entities.Department;
import com.alumniSphere.entities.Education;
import com.alumniSphere.entities.Project;
import com.alumniSphere.entities.StudentProfile;
import com.alumniSphere.entities.User;
import com.alumniSphere.repos.AchievementRepo;
import com.alumniSphere.repos.CertificationRepo;
import com.alumniSphere.repos.DepartmentRepo;
import com.alumniSphere.repos.EducationRepo;
import com.alumniSphere.repos.ProjectRepo;
import com.alumniSphere.repos.StudentProfileRepo;

@Service
public class StudentProfileService {
	private StudentProfileRepo studProfRepo;
	private DepartmentRepo departRepo;
	private ProjectRepo projRepo;
	private EducationRepo eduRepo;
	private CertificationRepo certRepo;
	private AchievementRepo achRepo;
	
	public StudentProfileService(StudentProfileRepo studProfRepo, 
								 DepartmentRepo departRepo,
								 ProjectRepo projRepo,
								 EducationRepo eduRepo,
								 CertificationRepo certRepo,
								 AchievementRepo achRepo) {
		this.studProfRepo = studProfRepo;
		this.departRepo = departRepo;
		this.projRepo = projRepo;
		this.eduRepo = eduRepo;
		this.certRepo = certRepo;
		this.achRepo = achRepo;
	}
	
	
	public Boolean saveAchievement(AchievementDto achDto, Integer userId) {
		Achievement ach = new Achievement();
		ach.setUser(new User(userId));
		BeanUtils.copyProperties(achDto, ach);
		Achievement proj =achRepo.save(ach);
		
		return proj != null;
	}
	
	public List<AchievementDto> collectUserAchievement(Integer userId){
		List<Achievement> certification = achRepo.findByUserId(userId);
		List<AchievementDto> dtos = new ArrayList<>();
		for(Achievement next : certification) {
			AchievementDto  dto = new AchievementDto();
			BeanUtils.copyProperties(next, dto);
			dtos.add(dto);
		}
		return dtos;
	}
	
	public Boolean saveCertification(CertificationDto eduDto, Integer userId) {
		Certification education = new Certification();
		education.setUser(new User(userId));
		BeanUtils.copyProperties(eduDto, education);
		Certification proj =certRepo.save(education);
		
		return proj != null;
	}
	
	public List<CertificationDto> collectUserCertification(Integer userId){
		List<Certification> certification = certRepo.findByUserId(userId);
		List<CertificationDto> dtos = new ArrayList<>();
		for(Certification next : certification) {
			CertificationDto  dto = new CertificationDto();
			BeanUtils.copyProperties(next, dto);
			dtos.add(dto);
		}
		return dtos;
	}
	
	public Boolean saveEducation(EducationDto eduDto, Integer userId) {
		Education education = new Education();
		education.setUser(new User(userId));
		BeanUtils.copyProperties(eduDto, education);
		Education proj =eduRepo.save(education);
		
		return proj != null;
	}
	
	public List<EducationDto> collectUserEducation(Integer userId){
		List<Education> education = eduRepo.findByUserId(userId);
		List<EducationDto> dtos = new ArrayList<>();
		for(Education next : education) {
			EducationDto  dto = new EducationDto();
			BeanUtils.copyProperties(next, dto);
			dtos.add(dto);
		}
		return dtos;
	}
	public List<ProjectDto> collectUserProject(Integer userId){
		List<Project> projects = projRepo.findByUserId(userId);
		List<ProjectDto> dtos = new ArrayList<>();
		for(Project next : projects) {
			ProjectDto  dto = new ProjectDto();
			BeanUtils.copyProperties(next, dto);
			dtos.add(dto);
		}
		return dtos;
	}
	
	public Boolean saveProject(ProjectDto projDto, Integer userId) {
		Project project = new Project();
		project.setUser(new User(userId));
		BeanUtils.copyProperties(projDto, project);
		Project proj =projRepo.save(project);
		
		return proj != null;
	}
	
	public Boolean updateStudent(StudentProfileUpdateDto studProfUp) {
		Integer studentProfileId = studProfRepo.findStudentProfileIdByUserId(studProfUp.getUserId());
		System.out.println(studentProfileId+" from service");
		StudentProfile studProf = studProfRepo.findById(studentProfileId).get();
//		System.out.println(studentProfileId);
		studProf.setEnrollmentNo(studProfUp.getEnrollmentNo());
		studProf.setAboutUs(studProfUp.getAboutUs());
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
