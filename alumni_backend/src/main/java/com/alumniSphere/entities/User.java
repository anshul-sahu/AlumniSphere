package com.alumniSphere.entities;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer userId;
	
	@Column(nullable=false, length=100)
	private String name;
	
	@Column(nullable=false, length=150, unique=true)
	private String email;
	
	@Column(nullable=false)
	@Size(min=8, max=200)
	private String password;
	
	@Column(nullable=false)
	private String phone;
	
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	private Boolean emailVerified = false;
	
	private LocalDate createdAt;
	
	@OneToMany(mappedBy="user")
	private List<InternshipApplication> internshipApplication;
	
	@OneToMany(mappedBy="user", cascade=CascadeType.ALL)
	private List<Certification> certifications;
	
	@OneToMany(mappedBy="user", cascade=CascadeType.ALL)
	private List<Education> educations;
	
	@OneToMany(mappedBy="user", cascade=CascadeType.ALL)
	private List<Project> projects;
	
	@OneToMany(mappedBy="user", cascade=CascadeType.ALL)
	private List<Achievement> achievements;

	public List<Project> getProjects() {
		return projects;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
	}

	public List<Education> getEducations() {
		return educations;
	}

	public void setEducations(List<Education> educations) {
		this.educations = educations;
	}

	public User() {
		super();
	}

	public List<InternshipApplication> getInternshipApplication() {
		return internshipApplication;
	}

	public void setInternshipApplication(List<InternshipApplication> internshipApplication) {
		this.internshipApplication = internshipApplication;
	}

	public List<Certification> getCertifications() {
		return certifications;
	}

	public void setCertifications(List<Certification> certifications) {
		this.certifications = certifications;
	}

	public User(Integer userId) {
		super();
		this.userId = userId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Boolean getEmailVerified() {
		return emailVerified;
	}

	public void setEmailVerified(Boolean emailVerified) {
		this.emailVerified = emailVerified;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "User [ name=" + name + ", email=" + email + ", phone="
				+ phone +"]";
	}
	
	
	
	
}
