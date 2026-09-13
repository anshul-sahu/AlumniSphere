package com.alumniSphere.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.alumniSphere.entities.Certification;

public interface CertificationRepo extends JpaRepository<Certification, Integer>{
	@Query(value="select * from certifications where user_id = :userId", nativeQuery=true)
	public List<Certification>  findByUserId(Integer userId);
}
