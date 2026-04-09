package com.alumniSphere.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="internship_applications")
public class InternshipApplication {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer internshipApplicationId;
	
	@ManyToOne
	@JoinColumn(name="internship_id", nullable=false)
	private Internship internship;
	
	@ManyToOne
	@JoinColumn(name="user_id", nullable=false)
	private User user;
	
	@Enumerated(EnumType.STRING)
	@Column(length=30,nullable=false)
	private ApplicationStatus status;

	public Integer getInternshipApplicationId() {
		return internshipApplicationId;
	}

	public void setInternshipApplicationId(Integer internshipApplicationId) {
		this.internshipApplicationId = internshipApplicationId;
	}

	public Internship getInternship() {
		return internship;
	}

	public void setInternship(Internship internship) {
		this.internship = internship;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public ApplicationStatus getStatus() {
		return status;
	}

	public void setStatus(ApplicationStatus status) {
		this.status = status;
	}
	
	
}
