package com.alumniSphere.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.alumniSphere.entities.Achievement;

public interface AchievementRepo extends JpaRepository<Achievement, Integer>{
	@Query(value="select * from achievements where user_id = :userId", nativeQuery=true)
	public List<Achievement>  findByUserId(Integer userId);
}
