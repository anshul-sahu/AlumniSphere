package com.alumniSphere.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.alumniSphere.dtos.AgentChatDto;
import com.alumniSphere.services.AgenticAiService;


@RestController
public class AgenticAiController {
	
	private AgenticAiService agenticServ;
	
	public AgenticAiController(AgenticAiService agenticServ) {
		this.agenticServ = agenticServ;
	}
	
	@PostMapping("/chat_with_agent/{userId}")
	public String chatWithAgentic(@RequestBody AgentChatDto dto, @PathVariable Integer userId) {
//		System.out.println(dto.getChat());
		return agenticServ.chatWithAgent(dto.getChat(), userId);
	}
}
