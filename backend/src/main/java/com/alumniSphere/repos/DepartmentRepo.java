package com.alumniSphere.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumniSphere.entities.Department;

public interface DepartmentRepo extends JpaRepository<Department, Integer>{

}
