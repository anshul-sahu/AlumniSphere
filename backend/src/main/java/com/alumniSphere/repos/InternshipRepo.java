package com.alumniSphere.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumniSphere.entities.Internship;
import java.util.List;
import com.alumniSphere.entities.AlumniProfile;


public interface InternshipRepo extends JpaRepository<Internship, Integer>{
	public List<Internship> findAllByAlumni(AlumniProfile alumni);
}
