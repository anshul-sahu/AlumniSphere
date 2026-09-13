package com.alumniSphere.dtos;


public class ProjectDto {
private Integer projectId;
	
	private String title;
	private String description;
	private String technologyUsed;
	private String githubLink;
	private String demoLink;
	private Integer userId;
	public Integer getProjectId() {
		return projectId;
	}
	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTechnologyUsed() {
		return technologyUsed;
	}
	public void setTechnologyUsed(String technologyUsed) {
		this.technologyUsed = technologyUsed;
	}
	public String getGithubLink() {
		return githubLink;
	}
	public void setGithubLink(String githubLink) {
		this.githubLink = githubLink;
	}
	public String getDemoLink() {
		return demoLink;
	}
	public void setDemoLink(String demoLink) {
		this.demoLink = demoLink;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	@Override
	public String toString() {
		return "Projects [ title=" + title + ", description=" + description
				+ ", technologyUsed=" + technologyUsed + ", githubLink=" + githubLink + ", demoLink=" + demoLink
				+ ", userId=" + userId + "]";
	}
	
	
}
