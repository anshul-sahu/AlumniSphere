# 🎓 AlumniSphere — Alumni Management System

A full-stack **Alumni Management System** built using **Spring Boot and React**, designed to connect students and alumni while helping institutions manage users, mentorship, internships, job opportunities, and events through structured admin approval workflows.

AlumniSphere also integrates **AI-powered features** such as an AI Resume Builder and an AI chatbot that allows students to discover and apply for relevant internships through natural-language conversations.

---

## 📌 Features

### 👤 User Management

* User Registration & Login
* Role-based access control
* Three user roles:

  * Admin
  * Alumni
  * Student
* Admin-controlled account approval system
* Profile management

### ✅ Admin Panel

* Approve / Reject student and alumni registrations
* Manage alumni and student data
* Monitor platform activities
* Manage users and platform content

### 🎓 Alumni Module

* Maintain professional profiles
* Add professional information such as:

  * Company
  * Job position
  * Graduation year
  * Location
  * LinkedIn profile
* Share career updates
* Provide mentorship to students
* Upload job and internship opportunities

### 🎓 Student Module

* View alumni profiles
* Explore job and internship opportunities
* Request mentorship from alumni
* Interact with alumni
* Build AI-powered resumes
* Search and apply for internships using the AI chatbot

### 🤝 Mentorship System

* Alumni can make themselves available for mentorship
* Students can discover suitable alumni mentors
* Students can request mentorship and guidance

### 💼 Job & Internship Portal

* Alumni can post job and internship opportunities
* Students can browse available opportunities
* View opportunity details
* Apply for relevant internships and jobs

### 🤖 AI Resume Builder

AlumniSphere includes an **AI-powered Resume Builder** that provides two ways to generate a resume.

#### ✨ 1. Prompt-Based Resume Generation

Students can provide a prompt containing relevant information such as:

* Education details
* Projects
* Internships
* Technical skills
* Achievements
* Certifications
* Career information

The AI processes the provided information and generates a structured professional resume.

#### ⚡ 2. Resume Generation Using Existing Data

Students can also generate a resume automatically using the information already stored in the AlumniSphere database.

The system can use existing student information such as:

* Personal details
* Education
* Projects
* Internships
* Skills
* Certifications
* Other profile information

This reduces the need for students to enter the same information repeatedly.

### 💬 AI Internship Chatbot

AlumniSphere also provides an **AI-powered chatbot** that allows students to interact with the system using natural language.

Students can use the chatbot to:

* Ask about available internships
* Search for internships based on their requirements
* Get relevant internship recommendations
* View internship details
* Apply for internships directly through the conversation

Instead of manually navigating through multiple pages, a student can simply communicate with the chatbot and perform internship-related actions through the chat interface.

**Example:**

> "Find me Java internships suitable for a final-year student."

The chatbot can understand the request and provide relevant internship opportunities.

---

## 💻 Tech Stack

### 🔹 Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Bootstrap

### 🔹 Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* REST APIs

### 🔹 Database

* MySQL

### 🔹 AI Integration

* AI-powered Resume Generation
* AI Chatbot
* Natural Language Internship Search
* AI-based Internship Recommendations

### 🔹 Tools

* Git & GitHub
* Postman
* Maven
* VS Code
* Spring Tool Suite (STS)

### 🔹 Deployment

* AWS EC2
* Linux

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      React.js       │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                         REST API Calls
                               │
                    ┌──────────▼──────────┐
                    │    Spring Boot      │
                    │       Backend       │
                    └──────┬───────┬──────┘
                           │       │
              ┌────────────┘       └─────────────┐
              │                                  │
      ┌───────▼────────┐                ┌────────▼────────┐
      │     MySQL      │                │   AI Services   │
      │    Database    │                │ Resume + Chatbot│
      └────────────────┘                └─────────────────┘
```

---

## 🔐 User Roles

| Role        | Main Responsibilities                                                     |
| ----------- | ------------------------------------------------------------------------- |
| **Admin**   | Approve users, manage platform data and monitor activities                |
| **Alumni**  | Manage profile, provide mentorship, post jobs/internships                 |
| **Student** | Explore alumni, request mentorship, find internships and generate resumes |

---

## 🚀 Key Highlights

* Full-stack application using **React + Spring Boot**
* Role-based user management
* Admin approval workflow
* Alumni-student networking
* Mentorship system
* Job and internship portal
* AI-powered Resume Builder
* Resume generation from existing database information
* Prompt-based resume generation
* AI-powered internship chatbot
* Natural-language internship search
* Internship application through chatbot
* Responsive Bootstrap-based frontend
* Deployed on AWS EC2

---

## 🔮 Future Enhancements

* AI-based mentor recommendation system
* Advanced AI-powered career recommendations
* Real-time chat between students and alumni
* Events and networking management
* Donation management
* Mobile application
* Multi-institution SaaS platform
* Advanced analytics dashboard

---

## 📜 License

This project is developed for **educational and learning purposes**.

---

## 👨‍💻 Author

**Anshul Sahu**

Computer Science Undergraduate

---

⭐ If you find this project useful, consider giving it a star!
