package com.alumniSphere.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.alumniSphere.entities.Project;

public interface ProjectRepo extends JpaRepository<Project, Integer>{
	
	@Query(value="select * from projects where user_id = :userId", nativeQuery=true)
	public List<Project>  findByUserId(Integer userId);
}
