package com.alumniSphere.entities;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="internships")
public class Internship {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer internshipId;
	
	@Column(nullable=false)
	private String title;
	
	@Column(nullable=false)
	private String description;
	
	@Column(nullable=false)
	private String company;
	
	private String location;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable=false)
	private InternshipMode mode;
	
	@Column(nullable=false)
	private String duration;
	
	@Column(nullable=false)
	private String stipend;
	
	@Column(nullable=false)
	private String skillRequired;
	
	@Column(nullable=false)
	private LocalDate applyDeadline;
	
	@Column(nullable=false)
	private LocalDate createdAt;
	
	@ManyToOne
	@JoinColumn(name="alumni_profile_id", nullable=false)
	private AlumniProfile alumni;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable=false)
	private InternshipStatus status;
	
	@OneToMany(mappedBy="internship")
	private List<InternshipApplication> internshipApplication;

	
	public Internship(Integer internshipId) {
		super();
		this.internshipId = internshipId;
	}

	public Internship() {
		super();
	}

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

	public LocalDate getApplyDeadline() {
		return applyDeadline;
	}

	public void setApplyDeadline(LocalDate applyDeadline) {
		this.applyDeadline = applyDeadline;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}

	public AlumniProfile getAlumni() {
		return alumni;
	}

	public void setAlumni(AlumniProfile alumni) {
		this.alumni = alumni;
	}

	public InternshipStatus getStatus() {
		return status;
	}

	public void setStatus(InternshipStatus status) {
		this.status = status;
	}
}
