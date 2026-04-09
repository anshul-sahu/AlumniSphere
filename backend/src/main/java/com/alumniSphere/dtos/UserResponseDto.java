package com.alumniSphere.dtos;

import java.time.LocalDate;

import com.alumniSphere.entities.Role;
import com.alumniSphere.entities.Status;

public class UserResponseDto {
	private Integer userId;
	private String name;
	private String email;
	private String phone;
	private Role role;
	private Status status;
	private LocalDate createdAt;
	
	
	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
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
	
	@Override
	public String toString() {
		return "UserDto [name=" + name + ", email=" + email + ", password=" + ", phone=" + phone + ", role="
				+ role + ", status=" + status + "]";
	}
}
