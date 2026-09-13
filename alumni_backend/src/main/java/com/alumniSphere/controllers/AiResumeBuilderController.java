package com.alumniSphere.controllers;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alumniSphere.dtos.ApiResponse;
import com.alumniSphere.dtos.UserChatQueryDto;
import com.alumniSphere.services.AiResumeBuilderService;

@RestController
public class AiResumeBuilderController {
	
	private AiResumeBuilderService aiResServ;
	
	
	public AiResumeBuilderController(AiResumeBuilderService aiResServ) {
		this.aiResServ = aiResServ;
	}


	@GetMapping("/ai_generate_resume/{userId}")
	public ResponseEntity<Map<String, Object>> getAiGeneratedResume(@PathVariable("userId") Integer userId) throws IOException{
		 Map<String, Object> map =  aiResServ.automaticallyResumeResp(userId);
		 return new ResponseEntity<>(map, HttpStatus.OK);
	}

	@PostMapping("/chat")
	public ResponseEntity<Map<String, Object>> getAiResp(@RequestBody UserChatQueryDto dto) throws IOException{
		Map<String, Object> map =  aiResServ.generateResumeResp(dto.getUserQuery());
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
	
}
