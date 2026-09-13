package com.alumniSphere.dtos;

public class CertificationDto {
	private Integer certificationId;
	private String title;
	private String issuingOrganization;
	private String year;
	
	public Integer getCertificationId() {
		return certificationId;
	}
	public void setCertificationId(Integer certificationId) {
		this.certificationId = certificationId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getIssuingOrganization() {
		return issuingOrganization;
	}
	public void setIssuingOrganization(String issuingOrganization) {
		this.issuingOrganization = issuingOrganization;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	@Override
	public String toString() {
		return "Certifications [ title=" + title + ", issuingOrganization="
				+ issuingOrganization + ", year=" + year + "]";
	}
	
	
}
