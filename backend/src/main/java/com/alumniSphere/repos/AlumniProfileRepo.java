package com.alumniSphere.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alumniSphere.entities.AlumniProfile;


public interface AlumniProfileRepo extends JpaRepository<AlumniProfile, Integer>{
	
	 @Query("""
		        SELECT a FROM AlumniProfile a
		        LEFT JOIN FETCH a.department
		        LEFT JOIN FETCH a.user
		    """)
		    List<AlumniProfile> findAllWithRelations();
	 
	 public AlumniProfile findByUser_userId(Integer userId);
	 
	 @Query("SELECT s.alumniProfileId FROM AlumniProfile s WHERE s.user.userId = :userId")
		Integer findAlumniProfileIdByUserId(@Param("userId") Integer userId);
}
