package com.alumniSphere.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="student_profile")
public class StudentProfile {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer studentProfileId;
	
	private String enrollmentNo;
	
	private String yearOfAdmission;
	
	private String resumeUrlPath;
	
	private String skill;
	
	@OneToOne
	@JoinColumn(name="user_id", nullable=false)
	private User user;
	
	@ManyToOne
	@JoinColumn(name="department_id", nullable=false)
	private Department department;

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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
	
	
}
