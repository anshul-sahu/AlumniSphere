package com.alumniSphere.dtos;

import com.alumniSphere.entities.User;

public class StudentProfileDto {
	private Integer studentProfileId;
	private String enrollmentNo;
	private String yearOfAdmission;
	private String resumeUrlPath;
	private String skill;
	private User user;
	private Integer departmentId;
	private String departmentName;
	
	public Integer getStudentProfileId() {
		return studentProfileId;
	}

	public void setStudentProfileId(Integer studentProfileId) {
		this.studentProfileId = studentProfileId;
	}


	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

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

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	@Override
	public String toString() {
		return "StudentProfileDto [" + ", enrollmentNo=" + enrollmentNo
				+ ", yearOfAdmission=" + yearOfAdmission + ", resumeUrlPath=" + resumeUrlPath + ", skill=" + skill
				+ ", user=" + user + ", departmentId=" + departmentId + "]";
	}
	
	
}
