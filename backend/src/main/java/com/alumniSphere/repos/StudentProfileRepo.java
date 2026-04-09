package com.alumniSphere.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alumniSphere.entities.StudentProfile;

public interface StudentProfileRepo extends JpaRepository<StudentProfile, Integer>{
	@Query("""
	        SELECT a FROM StudentProfile a
	        LEFT JOIN FETCH a.department
	        LEFT JOIN FETCH a.user
	    """)
	    List<StudentProfile> findAllWithRelations();
	
	public StudentProfile findByUser_userId(Integer userId);
	
//	@Query("select s.studentProfileId from StudentProfile s where s.user.userId=: userId")
//	public Integer findStudentProfileIdByUserId(Integer userId);
	@Query("SELECT s.studentProfileId FROM StudentProfile s WHERE s.user.userId = :userId")
	Integer findStudentProfileIdByUserId(@Param("userId") Integer userId);
}
