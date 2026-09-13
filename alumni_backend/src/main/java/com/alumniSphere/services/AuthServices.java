package com.alumniSphere.services;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.alumniSphere.dtos.LoginDto;
import com.alumniSphere.dtos.UserDto;
import com.alumniSphere.dtos.UserResponseDto;
import com.alumniSphere.entities.Status;
import com.alumniSphere.entities.User;
import com.alumniSphere.repos.UserRepo;

import jakarta.transaction.Transactional;

@Service
public class AuthServices implements UserDetailsService{
	
	private UserRepo userRepo;
	
	public AuthServices(UserRepo userRepo) {
		this.userRepo = userRepo;
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = userRepo.findByEmail(email);
		
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), Collections.emptyList());
	}
	
	@Transactional
	public void userApproval(Integer userId) {
		 Optional<User> user = userRepo.findById(userId);
		 User u = user.get();
		 u.setStatus(Status.ACTIVE);
	}
	
	public boolean checkPassword(LoginDto loginDto) {
		User user = userRepo.findByEmail(loginDto.getEmail());
		
		if(user.getPassword().equals(loginDto.getPassword())) {
			return true;
		}else {
			return false;
		}
	}
	
	public UserResponseDto getUserDto(String email) {
		User user = userRepo.findByEmailId(email);
		UserResponseDto userResp = new UserResponseDto();
		BeanUtils.copyProperties(user, userResp); 
		return userResp;
	}
	
	public boolean emailExists(String email) {
		return userRepo.existsByEmail(email);
	}
	
	public UserDto saveUser(UserDto userDto) {
		userDto.setCreatedAt(LocalDate.now());
		userDto.setStatus(Status.PENDING);
		User user = new User();
		BeanUtils.copyProperties(userDto, user);
		User savedUser = userRepo.save(user);
		UserDto savedDto = new UserDto();
		BeanUtils.copyProperties(savedUser, savedDto);
		return savedDto;
	}
}
