package com.alumniSphere.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.alumniSphere.entities.Education;

public interface EducationRepo extends JpaRepository<Education, Integer>{
	@Query(value="select * from educations where user_id = :userId", nativeQuery=true)
	public List<Education>  findByUserId(Integer userId);
}
