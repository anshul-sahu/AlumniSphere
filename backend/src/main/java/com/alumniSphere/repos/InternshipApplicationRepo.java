package com.alumniSphere.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumniSphere.entities.Internship;
import com.alumniSphere.entities.InternshipApplication;

public interface InternshipApplicationRepo extends JpaRepository<InternshipApplication, Integer>{
	public List<InternshipApplication> findAllApplicationsByInternship(Internship internship);
}
