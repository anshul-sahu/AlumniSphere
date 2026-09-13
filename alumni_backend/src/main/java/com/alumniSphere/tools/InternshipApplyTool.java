package com.alumniSphere.tools;

import java.util.List;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.stereotype.Component;

import com.alumniSphere.dtos.InternshipDto;
import com.alumniSphere.services.InternshipService;

@Component
public class InternshipApplyTool {
	
	private InternshipService interServ;
	
	
	
	public InternshipApplyTool(InternshipService interServ) {
		this.interServ = interServ;
	}
	
	@Tool(description="get all internship which has not meet the deadline compare deadline with the current date")
	public String getAllInternshipUsingAi() {
		StringBuilder str = new StringBuilder();
		List<InternshipDto> dtos = interServ.collectAllInternship();
		for(InternshipDto next : dtos) {
			str.append(next);
		}
		
//		System.out.println("getAllInternshipUsingAi called.....");
		return str.toString();
	}
	
	@Tool(description="apply for the internship when the user responded with internshipId")
	public String applyForInternship(@ToolParam(description="userId of the user") Integer userId, @ToolParam(description="internshipId") Integer internshipId) {
			interServ.applyForInternship(userId, internshipId);
			System.out.println("internship applied successfully from ai .... applyForInternship()");
		return "applied successfully";
	}
}
