package com.alumniSphere.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.alumniSphere.dtos.AchievementDto;
import com.alumniSphere.dtos.CertificationDto;
import com.alumniSphere.dtos.EducationDto;
import com.alumniSphere.dtos.ProjectDto;
import com.alumniSphere.dtos.UserDto;
import com.alumniSphere.entities.StudentProfile;
import com.alumniSphere.entities.User;
import com.alumniSphere.repos.StudentProfileRepo;
import com.alumniSphere.repos.UserRepo;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AiResumeBuilderService {
	private ChatClient chatClient;
	private StudentProfileService studServ;
	private UserRepo userRepo;
	private StudentProfileRepo studRepo;
	
	public AiResumeBuilderService(ChatClient.Builder builder, 
								  StudentProfileService studServ,
								  UserRepo userRepo,
								  StudentProfileRepo studRepo) {
		this.chatClient = builder.build();
		this.studServ = studServ;
		this.userRepo = userRepo;
		this.studRepo = studRepo;
	} 
	
	public String loadPromptFromFile(String fileName) throws IOException{
		Path path = new ClassPathResource(fileName).getFile().toPath();
		
		return Files.readString(path);
	}
	
	String putValuesToTemplate(String template, Map<String, String> map) {
		for(Map.Entry<String, String> entry : map.entrySet()) {
			template = template.replace("{{"+ entry.getKey() +"}}", entry.getValue());
		}
		return template;
	}
	
	public Map<String, Object> parseMultipleResp(String response){
		Map<String, Object> jsonResp = new HashMap<>();
		
		int startInd = response.indexOf("```json")+7;
		int endInd = response.lastIndexOf("```");
		
		if(startInd != -1 && endInd != -1 && startInd < endInd) {
			String jsonContent = response.substring(startInd,endInd).trim();
			try {
				ObjectMapper objectMapper = new ObjectMapper();
				Map<String, Object> dataContent = objectMapper.readValue(jsonContent, Map.class);
				jsonResp.put("data", dataContent);
			}catch(Exception e) {
				jsonResp.put("data", null);
			}
		}else {
			jsonResp.put("data", null);
		}
		return jsonResp;
	}
	
	public Map<String, Object> generateResumeResp(String userQuery) throws IOException{
		String promptString = loadPromptFromFile("resume_prompt.txt");
		
		String promptContent = putValuesToTemplate(promptString, Map.of("userDescription", userQuery));
		String response = chatClient.prompt(promptContent).call().content();
		Map<String, Object> jsonResp = parseMultipleResp(response);
		return jsonResp;
	}
	
	public Map<String, Object> automaticallyResumeResp(Integer userId) throws IOException{
		StringBuilder str = new StringBuilder();
		List<CertificationDto> certList = studServ.collectUserCertification(userId);
		List<EducationDto> eduList = studServ.collectUserEducation(userId);
		List<ProjectDto> projList = studServ.collectUserProject(userId);
		List<AchievementDto> achList = studServ.collectUserAchievement(userId);
		User user =  userRepo.findById(userId).get();
		StudentProfile prof = studRepo.findByUser_userId(userId);
		
		str.append(user);
		str.append(prof);
		for(CertificationDto next : certList) {
			str.append(next);
		}
		for(EducationDto next : eduList) {
			str.append(next);
		}
		for(ProjectDto next : projList) {
			str.append(next);
		}
		for(AchievementDto next : achList) {
			str.append(next);
		}
		
		
		Map<String, Object> jsonResp = this.generateResumeResp(str.toString());
		return jsonResp;
	}
	
	
}
