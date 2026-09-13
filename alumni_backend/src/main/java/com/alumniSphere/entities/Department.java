package com.alumniSphere.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "departments")
public class Department {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer departmentId;

	@Column(unique = true, nullable = false)
	private String name;

	@OneToMany(mappedBy = "department")
	private List<AlumniProfile> alumniProfiles;

	@OneToMany(mappedBy = "department")
	private List<StudentProfile> studentProfiles;

	public Department(Integer departmentId) {
		super();
		this.departmentId = departmentId;
	}

	public Department() {
		super();
	}

	public List<StudentProfile> getStudentProfiles() {
		return studentProfiles;
	}

	public void setStudentProfiles(List<StudentProfile> studentProfiles) {
		this.studentProfiles = studentProfiles;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<AlumniProfile> getAlumniProfiles() {
		return alumniProfiles;
	}

	public void setAlumniProfiles(List<AlumniProfile> alumniProfiles) {
		this.alumniProfiles = alumniProfiles;
	}
	
}
