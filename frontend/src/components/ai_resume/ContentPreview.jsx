import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResumePreview from "./ResumePreview";

function EditResume() {

    const location = useLocation();
    const navigate = useNavigate();

    // Your current navigation structure:
    // navigate("/edit-resume", { state: { data: jsonData } })
    //
    // Since jsonData contains { data: { personalInformation: ... } }
    const initialData = location.state?.data?.data;

    const [formData, setFormData] = useState(initialData);

    // If data is not available
    if (!formData) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger text-center">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Resume data not found.
                </div>
            </div>
        );
    }

    // ==========================================
    // PERSONAL INFORMATION
    // ==========================================

    const handlePersonalChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,

            personalInformation: {
                ...prev.personalInformation,
                [name]: value
            }
        }));
    };


    // ==========================================
    // SKILLS
    // ==========================================

    const handleSkillChange = (index, field, value) => {

        setFormData((prev) => {

            const skills = [...prev.personalInformation.skills];

            skills[index] = {
                ...skills[index],
                [field]: value
            };

            return {
                ...prev,

                personalInformation: {
                    ...prev.personalInformation,
                    skills
                }
            };
        });
    };


    // ==========================================
    // ARRAY FIELD HANDLER
    // ==========================================

    const handleArrayChange = (
        section,
        index,
        field,
        value
    ) => {

        setFormData((prev) => {

            const updatedArray = [...prev[section]];

            updatedArray[index] = {
                ...updatedArray[index],
                [field]: value
            };

            return {
                ...prev,
                [section]: updatedArray
            };
        });
    };


    // ==========================================
    // LANGUAGE / INTEREST
    // ==========================================

    const handleSimpleArrayChange = (
        section,
        index,
        value
    ) => {

        setFormData((prev) => {

            const updatedArray = [...prev[section]];

            updatedArray[index] = {
                ...updatedArray[index],
                name: value
            };

            return {
                ...prev,
                [section]: updatedArray
            };
        });
    };


    // ==========================================
    // PROJECT TECHNOLOGIES
    // ==========================================

    const handleTechnologyChange = (
        projectIndex,
        technologyIndex,
        value
    ) => {

        setFormData((prev) => {

            const projects = [...prev.projects];

            const technologies = [
                ...projects[projectIndex].technologiesUsed
            ];

            technologies[technologyIndex] = value;

            projects[projectIndex] = {
                ...projects[projectIndex],
                technologiesUsed: technologies
            };

            return {
                ...prev,
                projects
            };
        });
    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("Final Edited Resume Data:");
        console.log(formData);

        navigate("/student/ai/resume/preview", {
        state: {
            data: formData
        }
    });
    };


    return (

        <div className="bg-light min-vh-100">

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="bg-primary text-white shadow-sm">

                <div className="container py-4">

                    <div className="d-flex align-items-center">

                        <div
                            className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{
                                width: "50px",
                                height: "50px"
                            }}
                        >
                            <i className="bi bi-pencil-square fs-4"></i>
                        </div>

                        <div>

                            <h2 className="mb-1">
                                Review & Edit Resume
                            </h2>

                            <p className="mb-0 opacity-75">
                                Review the AI generated information and make
                                changes before creating your final resume.
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==========================================
                MAIN CONTAINER
            ========================================== */}

            <div className="container py-4">

                <form onSubmit={handleSubmit}>


                    {/* ==========================================
                        PERSONAL INFORMATION
                    ========================================== */}

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white py-3">

                            <h5 className="text-primary mb-0">

                                <i className="bi bi-person-circle me-2"></i>

                                Personal Information

                            </h5>

                        </div>


                        <div className="card-body">

                            <div className="row g-3">


                                {/* Full Name */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control"
                                        value={
                                            formData.personalInformation.fullName || ""
                                        }
                                        onChange={handlePersonalChange}
                                        placeholder="Enter your full name"
                                    />

                                </div>


                                {/* Email */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={
                                            formData.personalInformation.email || ""
                                        }
                                        onChange={handlePersonalChange}
                                        placeholder="Enter email"
                                    />

                                </div>


                                {/* Phone */}

                                <div className="col-md-4">

                                    <label className="form-label fw-semibold">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={
                                            formData.personalInformation.phoneNumber || ""
                                        }
                                        onChange={handlePersonalChange}
                                    />

                                </div>


                                {/* Location */}

                                <div className="col-md-8">

                                    <label className="form-label fw-semibold">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        className="form-control"
                                        value={
                                            formData.personalInformation.location || ""
                                        }
                                        onChange={handlePersonalChange}
                                    />

                                </div>


                                {/* LinkedIn */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        <i className="bi bi-linkedin me-1"></i>

                                        LinkedIn

                                    </label>

                                    <input
                                        type="url"
                                        name="linkedIn"
                                        className="form-control"
                                        value={
                                            formData.personalInformation.linkedIn || ""
                                        }
                                        onChange={handlePersonalChange}
                                    />

                                </div>


                                {/* GitHub */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        <i className="bi bi-github me-1"></i>

                                        GitHub

                                    </label>

                                    <input
                                        type="url"
                                        name="gitHub"
                                        className="form-control"
                                        value={
                                            formData.personalInformation.gitHub || ""
                                        }
                                        onChange={handlePersonalChange}
                                    />

                                </div>


                                {/* Portfolio */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        <i className="bi bi-globe me-1"></i>

                                        Portfolio

                                    </label>

                                    <input
                                        type="url"
                                        name="portfolio"
                                        className="form-control"
                                        value={
                                            formData.personalInformation.portfolio || ""
                                        }
                                        onChange={handlePersonalChange}
                                        placeholder="https://yourportfolio.com"
                                    />

                                </div>


                                {/* Summary */}

                                <div className="col-12">

                                    <label className="form-label fw-semibold">
                                        Professional Summary
                                    </label>

                                    <textarea
                                        name="summary"
                                        rows="5"
                                        className="form-control"
                                        value={
                                            formData.personalInformation.summary || ""
                                        }
                                        onChange={handlePersonalChange}
                                        placeholder="Write your professional summary"
                                    ></textarea>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ==========================================
                        SKILLS
                    ========================================== */}

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white py-3">

                            <h5 className="text-primary mb-0">

                                <i className="bi bi-tools me-2"></i>

                                Skills

                            </h5>

                        </div>


                        <div className="card-body">

                            {formData.personalInformation.skills.map(
                                (skill, index) => (

                                    <div
                                        className="row g-3 mb-3"
                                        key={index}
                                    >

                                        <div className="col-md-8">

                                            <label className="form-label">
                                                Skill
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={skill.title || ""}
                                                onChange={(e) =>
                                                    handleSkillChange(
                                                        index,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>


                                        <div className="col-md-4">

                                            <label className="form-label">
                                                Skill Level
                                            </label>

                                            <select
                                                className="form-select"
                                                value={skill.level || ""}
                                                onChange={(e) =>
                                                    handleSkillChange(
                                                        index,
                                                        "level",
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="Beginner">
                                                    Beginner
                                                </option>

                                                <option value="Intermediate">
                                                    Intermediate
                                                </option>

                                                <option value="Advanced">
                                                    Advanced
                                                </option>

                                            </select>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* ==========================================
                        EXPERIENCE
                    ========================================== */}

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white py-3">

                            <h5 className="text-primary mb-0">

                                <i className="bi bi-briefcase me-2"></i>

                                Experience

                            </h5>

                        </div>


                        <div className="card-body">

                            {formData.experience.map(
                                (experience, index) => (

                                    <div
                                        className="border rounded p-3 mb-4"
                                        key={index}
                                    >

                                        <div className="row g-3">


                                            <div className="col-md-6">

                                                <label className="form-label">
                                                    Job Title
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        experience.jobTitle || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "experience",
                                                            index,
                                                            "jobTitle",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="col-md-6">

                                                <label className="form-label">
                                                    Company
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        experience.company || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "experience",
                                                            index,
                                                            "company",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="col-md-6">

                                                <label className="form-label">
                                                    Location
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        experience.location || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "experience",
                                                            index,
                                                            "location",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="col-md-6">

                                                <label className="form-label">
                                                    Duration
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        experience.duration || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "experience",
                                                            index,
                                                            "duration",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="col-12">

                                                <label className="form-label">
                                                    Responsibilities
                                                </label>

                                                <textarea
                                                    rows="4"
                                                    className="form-control"
                                                    value={
                                                        experience.responsibility || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "experience",
                                                            index,
                                                            "responsibility",
                                                            e.target.value
                                                        )
                                                    }
                                                ></textarea>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* ==========================================
                        EDUCATION
                    ========================================== */}

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white py-3">

                            <h5 className="text-primary mb-0">

                                <i className="bi bi-mortarboard me-2"></i>

                                Education

                            </h5>

                        </div>


                        <div className="card-body">

                            {formData.education.map(
                                (education, index) => (

                                    <div
                                        className="border rounded p-3 mb-4"
                                        key={index}
                                    >

                                        <div className="row g-3">


                                            <div className="col-md-8">

                                                <label className="form-label">
                                                    Degree
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        education.degree || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "education",
                                                            index,
                                                            "degree",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="col-md-4">

                                                <label className="form-label">
                                                    Graduation Year
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        education.graduationYear || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "education",
                                                            index,
                                                            "graduationYear",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="col-md-8">

                                                <label className="form-label">
                                                    University
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        education.university || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "education",
                                                            index,
                                                            "university",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="col-md-4">

                                                <label className="form-label">
                                                    Location
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        education.location || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "education",
                                                            index,
                                                            "location",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* ==========================================
                        CERTIFICATIONS
                    ========================================== */}

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white py-3">

                            <h5 className="text-primary mb-0">

                                <i className="bi bi-patch-check me-2"></i>

                                Certifications

                            </h5>

                        </div>


                        <div className="card-body">

                            {formData.certifications.map(
                                (certification, index) => (

                                    <div
                                        className="border rounded p-3 mb-4"
                                        key={index}
                                    >

                                        <div className="row g-3">


                                            <div className="col-md-6">

                                                <label className="form-label">
                                                    Certification Title
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        certification.title || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "certifications",
                                                            index,
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="col-md-4">

                                                <label className="form-label">
                                                    Issuing Organization
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        certification.issuingOrganization || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "certifications",
                                                            index,
                                                            "issuingOrganization",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="col-md-2">

                                                <label className="form-label">
                                                    Year
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        certification.year || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "certifications",
                                                            index,
                                                            "year",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* ==========================================
                        PROJECTS
                    ========================================== */}

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white py-3">

                            <h5 className="text-primary mb-0">

                                <i className="bi bi-code-square me-2"></i>

                                Projects

                            </h5>

                        </div>


                        <div className="card-body">

                            {formData.projects.map(
                                (project, index) => (

                                    <div
                                        className="border rounded p-3 mb-4"
                                        key={index}
                                    >

                                        <div className="row g-3">


                                            <div className="col-md-8">

                                                <label className="form-label">
                                                    Project Title
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        project.title || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "projects",
                                                            index,
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="col-md-4">

                                                <label className="form-label">
                                                    GitHub Link
                                                </label>

                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    value={
                                                        project.githubLink || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "projects",
                                                            index,
                                                            "githubLink",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="https://github.com/..."
                                                />

                                            </div>


                                            <div className="col-12">

                                                <label className="form-label">
                                                    Project Description
                                                </label>

                                                <textarea
                                                    rows="4"
                                                    className="form-control"
                                                    value={
                                                        project.description || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "projects",
                                                            index,
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                ></textarea>

                                            </div>


                                            <div className="col-12">

                                                <label className="form-label">
                                                    Technologies Used
                                                </label>


                                                <div className="row g-2">

                                                    {project.technologiesUsed.map(
                                                        (
                                                            technology,
                                                            technologyIndex
                                                        ) => (

                                                            <div
                                                                className="col-md-4 col-sm-6"
                                                                key={technologyIndex}
                                                            >

                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={
                                                                        technology
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleTechnologyChange(
                                                                            index,
                                                                            technologyIndex,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* ==========================================
                        ACHIEVEMENTS
                    ========================================== */}

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white py-3">

                            <h5 className="text-primary mb-0">

                                <i className="bi bi-trophy me-2"></i>

                                Achievements

                            </h5>

                        </div>


                        <div className="card-body">

                            {formData.achievements.map(
                                (achievement, index) => (

                                    <div
                                        className="border rounded p-3 mb-4"
                                        key={index}
                                    >

                                        <div className="row g-3">


                                            <div className="col-md-7">

                                                <label className="form-label">
                                                    Achievement
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        achievement.title || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "achievements",
                                                            index,
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="col-md-2">

                                                <label className="form-label">
                                                    Year
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        achievement.year || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "achievements",
                                                            index,
                                                            "year",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>


                                            <div className="col-md-3">

                                                <label className="form-label">
                                                    Additional Information
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        achievement.extraInformation || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleArrayChange(
                                                            "achievements",
                                                            index,
                                                            "extraInformation",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>


                    {/* ==========================================
                        LANGUAGES
                    ========================================== */}

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white py-3">

                            <h5 className="text-primary mb-0">

                                <i className="bi bi-translate me-2"></i>

                                Languages

                            </h5>

                        </div>


                        <div className="card-body">

                            <div className="row g-3">

                                {formData.languages.map(
                                    (language, index) => (

                                        <div
                                            className="col-md-4 col-sm-6"
                                            key={language.id}
                                        >

                                            <label className="form-label">
                                                Language
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    language.name || ""
                                                }
                                                onChange={(e) =>
                                                    handleSimpleArrayChange(
                                                        "languages",
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>


                    {/* ==========================================
                        INTERESTS
                    ========================================== */}

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-header bg-white py-3">

                            <h5 className="text-primary mb-0">

                                <i className="bi bi-heart me-2"></i>

                                Interests

                            </h5>

                        </div>


                        <div className="card-body">

                            <div className="row g-3">

                                {formData.interests.map(
                                    (interest, index) => (

                                        <div
                                            className="col-md-4 col-sm-6"
                                            key={interest.id}
                                        >

                                            <label className="form-label">
                                                Interest
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    interest.name || ""
                                                }
                                                onChange={(e) =>
                                                    handleSimpleArrayChange(
                                                        "interests",
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>


                    {/* ==========================================
                        BOTTOM ACTION
                    ========================================== */}

                    <div className="card border-0 shadow-sm mb-5">

                        <div className="card-body text-center py-4">

                            <p className="text-muted mb-3">
                                <i className="bi bi-info-circle me-1"></i>

                                Make sure all your information is correct
                                before continuing to the final preview.
                            </p>


                            <button
                                type="submit"
                                className="btn btn-primary btn-lg px-5"
                            >

                                <i className="bi bi-eye me-2"></i>

                                Continue to Preview

                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditResume;