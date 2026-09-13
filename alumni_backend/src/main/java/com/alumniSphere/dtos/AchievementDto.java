package com.alumniSphere.dtos;

public class AchievementDto {
	private Integer achievementId;
	private String title;
	private String year;
	private String extraInformation;
	public Integer getAchievementId() {
		return achievementId;
	}
	public void setAchievementId(Integer achievementId) {
		this.achievementId = achievementId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getExtraInformation() {
		return extraInformation;
	}
	public void setExtraInformation(String extraInformation) {
		this.extraInformation = extraInformation;
	}
	@Override
	public String toString() {
		return "Achievement- [ title=" + title + ", year=" + year
				+ ", extraInformation=" + extraInformation + "]";
	}
	
	
}
