package com.alumniSphere.dtos;

public class EducationDto {
		private Integer educationId;
		private String degree;
		private String university;
		private String graduationYear;
		private String location;

		public Integer getEducationId() {
			return educationId;
		}

		public void setEducationId(Integer educationId) {
			this.educationId = educationId;
		}

		public String getDegree() {
			return degree;
		}

		public void setDegree(String degree) {
			this.degree = degree;
		}

		public String getUniversity() {
			return university;
		}

		public void setUniversity(String university) {
			this.university = university;
		}

		public String getGraduationYear() {
			return graduationYear;
		}

		public void setGraduationYear(String graduationYear) {
			this.graduationYear = graduationYear;
		}

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}

		@Override
		public String toString() {
			return "Education [ degree=" + degree + ", university=" + university
					+ ", graduationYear=" + graduationYear + ", location=" + location + "]";
		}


}
