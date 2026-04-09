package com.alumniSphere.dtos;


public class StudentProfileUpdateDto {
	private Integer studentProfileId;
	private String enrollmentNo;
	private String yearOfAdmission;
	private String resumeUrlPath;
	private String skill;
	private Integer userId;
	private Integer departmentId;
	
	public Integer getStudentProfileId() {
		return studentProfileId;
	}
	public void setStudentProfileId(Integer studentProfileId) {
		this.studentProfileId = studentProfileId;
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
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	
	@Override
	public String toString() {
		return "StudentProfileUpdateDto [studentProfileId=" + studentProfileId + ", enrollmentNo=" + enrollmentNo
				+ ", yearOfAdmission=" + yearOfAdmission + ", resumeUrlPath=" + resumeUrlPath + ", skill=" + skill
				+ ", userId=" + userId + ", departmentId=" + departmentId + "]";
	}
	
	
}
