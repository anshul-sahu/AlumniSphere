package com.alumniSphere.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.alumniSphere.dtos.ApiResponse;
import com.alumniSphere.dtos.LoginDto;
import com.alumniSphere.dtos.UserDto;
import com.alumniSphere.dtos.UserResponseDto;
import com.alumniSphere.entities.Status;
import com.alumniSphere.services.AuthServices;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
public class AuthController {
	private AuthServices authServ;
	
	public AuthController(AuthServices authServ) {
		this.authServ = authServ;
	}
	
	@PutMapping("/users/{userId}/approve")
	public ResponseEntity<String> approveUser(@PathVariable Integer userId){
		authServ.userApproval(userId);
		return ResponseEntity.ok("user approved");
	}
	
	@GetMapping("/logout")
	public ResponseEntity<ApiResponse> logOut(HttpServletRequest request){
		HttpSession session = request.getSession(false);
		if(session != null) {
			session.invalidate();
		}
		return new ResponseEntity<>(new ApiResponse(true, "logout successfully"), HttpStatus.OK);
	}
	
	@PostMapping("/signIn")
	public ResponseEntity<ApiResponse> loginUser(@Valid @RequestBody LoginDto loginDto, HttpServletRequest request){
//		System.out.println(loginDto);
		Boolean emailExists = authServ.emailExists(loginDto.getEmail());
		if(!emailExists) {
			return new ResponseEntity<>(new ApiResponse(false, "email doesnt exists"), HttpStatus.UNAUTHORIZED);
		}
		
		if(authServ.checkPassword(loginDto)) {
			UserResponseDto userDto = authServ.getUserDto(loginDto.getEmail());
			if(userDto.getStatus().equals(Status.PENDING)) {
				return new ResponseEntity<>(new ApiResponse(false, "User status is Pending"), HttpStatus.UNAUTHORIZED);				
			}
			
			HttpSession session = request.getSession();
			session.setAttribute("user_id", userDto.getUserId());
			session.setAttribute("email", userDto.getEmail());
			session.setAttribute("role", userDto.getRole());
			
			return new ResponseEntity<>(new ApiResponse(true, "user login successfully", userDto), HttpStatus.OK);
		}else {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "password is incorrect"), HttpStatus.UNAUTHORIZED);
		}
	}
	
	@PostMapping("/signUp")
	public ResponseEntity<ApiResponse> saveUser(@Valid @RequestBody UserDto userDto) {
		Boolean emailExists = authServ.emailExists(userDto.getEmail());
		
		if(!emailExists) {
			UserDto savedUser = authServ.saveUser(userDto);
			
			if(savedUser != null && savedUser.getUserId() != null) {
				return new ResponseEntity<>(new ApiResponse(true, "user saved Successfully",savedUser), HttpStatus.CREATED);
			}
		}else {
			return new ResponseEntity<>(new ApiResponse(false, "email already exists"), HttpStatus.CONFLICT);
		}
		
		return new ResponseEntity<ApiResponse>(new ApiResponse(false, "user not saved "), HttpStatus.INSUFFICIENT_STORAGE);
	}
}
