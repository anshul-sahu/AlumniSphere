package com.alumniSphere.dtos;

import com.alumniSphere.entities.User;

public class StudentResDto {
	private String enrollmentNo;
	private String yearOfAdmission;
	private String resumeUrlPath;
	private String skill;
	private User user;
	private String departmentName;
	public String getEnrollmentNo() {
		return enrollmentNo;
	}
	public void setEnrollmentNo(String enrollmentNo) {
		this.enrollmentNo = enrollmentNo;
	}
	public String getYearOfAdmission() {
		return yearOfAdmission;
	}
	public void setYearOfAdmission(String yearOfAdmission) {
		this.yearOfAdmission = yearOfAdmission;
	}
	public String getResumeUrlPath() {
		return resumeUrlPath;
	}
	public void setResumeUrlPath(String resumeUrlPath) {
		this.resumeUrlPath = resumeUrlPath;
	}
	public String getSkill() {
		return skill;
	}
	public void setSkill(String skill) {
		this.skill = skill;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	
	
	
}
