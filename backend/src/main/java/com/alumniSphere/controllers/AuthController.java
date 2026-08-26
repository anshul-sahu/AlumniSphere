package com.alumniSphere.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.alumniSphere.jwts.JwtService;
import com.alumniSphere.services.AuthServices;

import jakarta.validation.Valid;

@RestController
//@CrossOrigin(origins="http://localhost:5173")
public class AuthController {
	
	private AuthServices authServ;
	
	private AuthenticationManager authManager;
	
	private PasswordEncoder passwEnc;
	
	private JwtService jwtServ;
	
	public AuthController(AuthServices authServ, AuthenticationManager authManager, 
					PasswordEncoder passwEnc, JwtService jwtServ) {
		this.authServ = authServ;
		this.authManager = authManager;
		this.passwEnc = passwEnc;
		this.jwtServ = jwtServ;
	}
	
	@PutMapping("/users/{userId}/approve")
	public ResponseEntity<String> approveUser(@PathVariable Integer userId){
		authServ.userApproval(userId);
		return ResponseEntity.ok("user approved");
	}
	
	@GetMapping("/logout")
	public ResponseEntity<ApiResponse> logOut(){
		
		return new ResponseEntity<>(new ApiResponse(true, "logout successfully"), HttpStatus.OK);
	}
	
	@PostMapping("/signIn")
	public ResponseEntity<ApiResponse> loginUser(@Valid @RequestBody LoginDto loginDto){
		
		Boolean emailExists = authServ.emailExists(loginDto.getEmail());
		if(!emailExists) {
			return new ResponseEntity<>(new ApiResponse(false, "email doesnt exists"), HttpStatus.UNAUTHORIZED);
		}
		
		Status status = authServ.getUserDto(loginDto.getEmail()).getStatus();
		
		if(status == Status.PENDING) {
			return new ResponseEntity<>(new ApiResponse(false, "approval pending from admin"), HttpStatus.UNAUTHORIZED);			
		}
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());;
		
		Authentication auth = authManager.authenticate(token);
		
		if(auth.isAuthenticated()) {
			UserResponseDto userDto = authServ.getUserDto(loginDto.getEmail());
			String jwtToken = jwtServ.generateToken(loginDto.getEmail());
			userDto.setToken(jwtToken);
			return new ResponseEntity<>(new ApiResponse(true, "user login successfully ", userDto), HttpStatus.OK);
		}else {
			return new ResponseEntity<ApiResponse>(new ApiResponse(false, "password is incorrect"), HttpStatus.UNAUTHORIZED);			
		}
		
	}
	
	@PostMapping("/signUp")
	public ResponseEntity<ApiResponse> saveUser(@Valid @RequestBody UserDto userDto) throws IOException{
		
		Boolean emailExists = authServ.emailExists(userDto.getEmail());
		
		if(!emailExists) {
			userDto.setPassword(passwEnc.encode(userDto.getPassword()));
			UserDto savedUser = authServ.saveUser(userDto);
			
			if(savedUser != null && savedUser.getUserId() != null) {
				Path path = Paths.get("users"+File.separator+savedUser.getUserId());
				Files.createDirectories(path);
				return new ResponseEntity<>(new ApiResponse(true, "user saved Successfully",savedUser), HttpStatus.CREATED);
			}
		}else {
			return new ResponseEntity<>(new ApiResponse(false, "email already exists"), HttpStatus.CONFLICT);
		}
		
		return new ResponseEntity<ApiResponse>(new ApiResponse(false, "user not saved "), HttpStatus.INSUFFICIENT_STORAGE);
	}
}
