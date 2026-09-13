package com.alumniSphere.dtos;

import com.alumniSphere.entities.Department;
import com.alumniSphere.entities.User;

public class AlumniRespDto {
	private String graduationYear;
	private String currentCompany;
	private String currentPosition;
	private String linkedInUrl;
	private String location;
	private Boolean availableForMentornship;
	private User user;
	private String departmentName;
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
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	
	
	
}
