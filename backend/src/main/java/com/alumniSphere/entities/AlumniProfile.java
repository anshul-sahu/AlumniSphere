package com.alumniSphere.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="alumni_profile")
public class AlumniProfile {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer alumniProfileId;
	
	@Column(nullable=false)
	private String graduationYear;
	
	@Column(nullable=false)
	private String currentCompany;

	@Column(nullable=false)
	private String currentPosition;
	
	private String linkedInUrl;
	
	@Column(nullable=false)
	private String location;

	@Column(nullable=false)
	private Boolean availableForMentornship;
	
	@OneToOne
	@JoinColumn(name="user_id", nullable=false)
	private User user;
	
	@ManyToOne
	@JoinColumn(name="department_id",nullable=false)
	private Department department;
	
	@OneToMany(mappedBy="alumni")
	private List<Internship> internship;
	
	

	public AlumniProfile() {
		super();
	}

	public AlumniProfile(Integer alumniProfileId) {
		super();
		this.alumniProfileId = alumniProfileId;
	}

	public Integer getAlumniProfileId() {
		return alumniProfileId;
	}

	public void setAlumniProfileId(Integer alumniProfileId) {
		this.alumniProfileId = alumniProfileId;
	}

	public String getGraduationYear() {
		return graduationYear;
	}

	public void setGraduationYear(String graduationYear) {
		this.graduationYear = graduationYear;
	}

	public String getCurrentCompany() {
		return currentCompany;
	}

	public void setCurrentCompany(String currentCompany) {
		this.currentCompany = currentCompany;
	}

	public String getCurrentPosition() {
		return currentPosition;
	}

	public void setCurrentPosition(String currentPosition) {
		this.currentPosition = currentPosition;
	}

	public String getLinkedInUrl() {
		return linkedInUrl;
	}

	public void setLinkedInUrl(String linkedInUrl) {
		this.linkedInUrl = linkedInUrl;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Boolean getAvailableForMentornship() {
		return availableForMentornship;
	}

	public void setAvailableForMentornship(Boolean availableForMentornship) {
		this.availableForMentornship = availableForMentornship;
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
