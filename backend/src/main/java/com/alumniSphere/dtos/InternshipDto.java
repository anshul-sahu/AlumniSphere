package com.alumniSphere.dtos;

import java.time.LocalDate;

import com.alumniSphere.entities.InternshipMode;
import com.alumniSphere.entities.InternshipStatus;

public class InternshipDto {
private Integer internshipId;
	private String title;
	private String description;
	private String company;
	private String location;
	private InternshipMode mode;
	private String duration;
	private String stipend;
	private String skillRequired;
	private String applyDeadline;
	private LocalDate createdAt;
//	private AlumniProfile alumni;
	private InternshipStatus status;
	public Integer getInternshipId() {
		return internshipId;
	}
	public void setInternshipId(Integer internshipId) {
		this.internshipId = internshipId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public InternshipMode getMode() {
		return mode;
	}
	public void setMode(InternshipMode mode) {
		this.mode = mode;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getStipend() {
		return stipend;
	}
	public void setStipend(String stipend) {
		this.stipend = stipend;
	}
	public String getSkillRequired() {
		return skillRequired;
	}
	public void setSkillRequired(String skillRequired) {
		this.skillRequired = skillRequired;
	}
	public String getApplyDeadline() {
		return applyDeadline;
	}
	public void setApplyDeadline(String applyDeadline) {
		this.applyDeadline = applyDeadline;
	}
	public LocalDate getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}
//	public AlumniProfile getAlumni() {
//		return alumni;
//	}
//	public void setAlumni(AlumniProfile alumni) {
//		this.alumni = alumni;
//	}
	public InternshipStatus getStatus() {
		return status;
	}
	public void setStatus(InternshipStatus status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "InternshipDto [internshipId=" + internshipId + ", title=" + title + ", description=" + description
				+ ", company=" + company + ", location=" + location + ", mode=" + mode + ", duration=" + duration
				+ ", stipend=" + stipend + ", skillRequired=" + skillRequired + ", applyDeadline=" + applyDeadline
				+ ", createdAt=" + createdAt + ", alumni="  + ", status=" + status + "]";
	}

	
}
