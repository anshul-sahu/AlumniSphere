package com.alumniSphere.dtos;

import com.alumniSphere.entities.ApplicationStatus;

public class StudentInternshipApplicationDto {
	private UserAppDto userAppDto;
	private ApplicationStatus status;
	public UserAppDto getUserAppDto() {
		return userAppDto;
	}
	public void setUserAppDto(UserAppDto userAppDto) {
		this.userAppDto = userAppDto;
	}
	public ApplicationStatus getStatus() {
		return status;
	}
	public void setStatus(ApplicationStatus status) {
		this.status = status;
	}
	
	
}
