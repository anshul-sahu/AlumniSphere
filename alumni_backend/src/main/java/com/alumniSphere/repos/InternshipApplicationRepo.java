package com.alumniSphere.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.alumniSphere.entities.Internship;
import com.alumniSphere.entities.InternshipApplication;

public interface InternshipApplicationRepo extends JpaRepository<InternshipApplication, Integer>{
	public List<InternshipApplication> findAllApplicationsByInternship(Internship internship);
	
	@Query(value="select * from internship_applications where user_id = :userId", nativeQuery=true)
	public List<InternshipApplication> findAllApplicationsByUserId(Integer userId);
}
