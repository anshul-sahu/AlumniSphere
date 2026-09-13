package com.alumniSphere.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.alumniSphere.entities.Role;
import com.alumniSphere.entities.User;



public interface UserRepo extends JpaRepository<User, Integer>{
	
	public Boolean existsByEmail(String email);
	
	public User findByEmail(String email);
	
	@Query(value="select * from users where email = :email", nativeQuery=true)
	public User  findByEmailId(String email);
	
	public Boolean existsByRole(Role role);
}
