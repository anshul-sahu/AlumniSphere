import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";

function ResumePreview() {

    const resumeRef = useRef(null);
    const location = useLocation();

    const formData = location.state?.data;
    console.log(formData, '-------')

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

    const personal = formData.personalInformation || {};

    const downloadPDF = () => {

        const element = resumeRef.current;

        const options = {
            margin: 0,
            filename: `${personal.fullName || "resume"}.pdf`,
            image: {
                type: "jpeg",
                quality: 0.98
            },
            html2canvas: {
                scale: 2,
                useCORS: true
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            },
            pagebreak: {
                mode: ["css", "legacy"]
            }
        };

        html2pdf()
            .set(options)
            .from(element)
            .save();
    };

    return (
        <div className="bg-light min-vh-100 py-4">

            {/* =========================
                TOP BUTTON
            ========================== */}

            <div className="container mb-4">

                <div className="d-flex justify-content-between align-items-center">

                    <h4 className="fw-bold text-primary mb-0">
                        <i className="bi bi-file-earmark-person me-2"></i>
                        Resume Preview
                    </h4>

                    <button
                        className="btn btn-primary"
                        onClick={downloadPDF}
                    >
                        <i className="bi bi-download me-2"></i>
                        Download PDF
                    </button>

                </div>

            </div>


            {/* =========================
                RESUME PAPER
            ========================== */}

            <div className="container">

                <div
                    ref={resumeRef}
                    className="bg-white shadow mx-auto"
                    style={{
                        maxWidth: "850px",
                        minHeight: "1120px",
                        padding: "55px",
                        fontFamily: "Arial, sans-serif",
                        color: "#212529"
                    }}
                >

                    {/* =========================
                        HEADER
                    ========================== */}

                    <div className="text-center">

                        <h1
                            className="fw-bold text-primary mb-2"
                            style={{ fontSize: "34px" }}
                        >
                            {personal.fullName}
                        </h1>

                        {personal.location && (
                            <div className="text-muted mb-2">
                                <i className="bi bi-geo-alt me-1"></i>
                                {personal.location}
                            </div>
                        )}

                        <div className="d-flex justify-content-center flex-wrap gap-3 small">

                            {personal.email && (
                                <span>
                                    <i className="bi bi-envelope me-1 text-primary"></i>
                                    {personal.email}
                                </span>
                            )}

                            {personal.phoneNumber && (
                                <span>
                                    <i className="bi bi-telephone me-1 text-primary"></i>
                                    {personal.phoneNumber}
                                </span>
                            )}

                        </div>


                        <div className="d-flex justify-content-center flex-wrap gap-3 mt-2 small">

                            {personal.linkedIn && (
                                <a
                                    href={personal.linkedIn}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-decoration-none"
                                >
                                    <i className="bi bi-linkedin me-1"></i>
                                    LinkedIn
                                </a>
                            )}

                            {personal.gitHub && (
                                <a
                                    href={personal.gitHub}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-decoration-none text-dark"
                                >
                                    <i className="bi bi-github me-1"></i>
                                    GitHub
                                </a>
                            )}

                            {personal.portfolio && (
                                <a
                                    href={personal.portfolio}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-decoration-none"
                                >
                                    <i className="bi bi-globe me-1"></i>
                                    Portfolio
                                </a>
                            )}

                        </div>

                    </div>


                    <hr className="my-4" />


                    {/* =========================
                        SUMMARY
                    ========================== */}

                    {personal.summary && (
                        <ResumeSection title="Professional Summary">

                            <p
                                className="mb-0"
                                style={{
                                    fontSize: "14px",
                                    lineHeight: "1.6"
                                }}
                            >
                                {personal.summary}
                            </p>

                        </ResumeSection>
                    )}


                    {/* =========================
                        SKILLS
                    ========================== */}

                    {personal.skills?.length > 0 && (

                        <ResumeSection title="Skills">

                            <div className="row g-2">

                                {personal.skills.map((skill, index) => (

                                    <div
                                        className="col-6 col-md-4"
                                        key={index}
                                    >

                                        <div
                                            className="border rounded px-2 py-2"
                                            style={{ fontSize: "13px" }}
                                        >

                                            <span className="fw-semibold">
                                                {skill.title}
                                            </span>

                                            {skill.level && (
                                                <span className="text-muted">
                                                    {" "}— {skill.level}
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </ResumeSection>

                    )}


                    {/* =========================
                        EXPERIENCE
                    ========================== */}

                    {formData.experience?.length > 0 && (

                        <ResumeSection title="Experience">

                            {formData.experience.map((experience, index) => (

                                <div
                                    key={index}
                                    className="mb-4"
                                >

                                    <div className="d-flex justify-content-between">

                                        <div>

                                            <h6 className="fw-bold mb-1">
                                                {experience.jobTitle}
                                            </h6>

                                            <div
                                                className="fw-semibold text-primary"
                                                style={{ fontSize: "14px" }}
                                            >
                                                {experience.company}
                                            </div>

                                        </div>

                                        <div className="text-end">

                                            {experience.duration && (
                                                <div
                                                    className="fw-semibold"
                                                    style={{ fontSize: "12px" }}
                                                >
                                                    {experience.duration}
                                                </div>
                                            )}

                                            {experience.location && (
                                                <div
                                                    className="text-muted"
                                                    style={{ fontSize: "12px" }}
                                                >
                                                    {experience.location}
                                                </div>
                                            )}

                                        </div>

                                    </div>


                                    {experience.responsibility && (
                                        <p
                                            className="mt-2 mb-0"
                                            style={{
                                                fontSize: "13px",
                                                lineHeight: "1.6"
                                            }}
                                        >
                                            {experience.responsibility}
                                        </p>
                                    )}

                                </div>

                            ))}

                        </ResumeSection>

                    )}


                    {/* =========================
                        EDUCATION
                    ========================== */}

                    {formData.education?.length > 0 && (

                        <ResumeSection title="Education">

                            {formData.education.map((education, index) => (

                                <div
                                    key={index}
                                    className="mb-3"
                                >

                                    <div className="d-flex justify-content-between">

                                        <div>

                                            <h6 className="fw-bold mb-1">
                                                {education.degree}
                                            </h6>

                                            <div
                                                className="text-primary fw-semibold"
                                                style={{ fontSize: "14px" }}
                                            >
                                                {education.university}
                                            </div>

                                        </div>

                                        <div className="text-end">

                                            <div
                                                className="fw-semibold"
                                                style={{ fontSize: "12px" }}
                                            >
                                                {education.graduationYear}
                                            </div>

                                            <div
                                                className="text-muted"
                                                style={{ fontSize: "12px" }}
                                            >
                                                {education.location}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </ResumeSection>

                    )}


                    {/* =========================
                        PROJECTS
                    ========================== */}

                    {formData.projects?.length > 0 && (

                        <ResumeSection title="Projects">

                            {formData.projects.map((project, index) => (

                                <div
                                    key={index}
                                    className="mb-4"
                                >

                                    <div className="d-flex justify-content-between align-items-center">

                                        <h6 className="fw-bold mb-1">
                                            {project.title}
                                        </h6>

                                        {project.githubLink && (

                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="small text-decoration-none"
                                            >
                                                <i className="bi bi-github me-1"></i>
                                                GitHub
                                            </a>

                                        )}

                                    </div>


                                    {project.description && (

                                        <p
                                            className="mb-2"
                                            style={{
                                                fontSize: "13px",
                                                lineHeight: "1.6"
                                            }}
                                        >
                                            {project.description}
                                        </p>

                                    )}


                                    {project.technologiesUsed?.length > 0 && (

                                        <div>

                                            {project.technologiesUsed.map(
                                                (technology, techIndex) => (

                                                    <span
                                                        key={techIndex}
                                                        className="badge text-bg-light border me-1 mb-1"
                                                        style={{
                                                            fontSize: "11px"
                                                        }}
                                                    >
                                                        {technology}
                                                    </span>

                                                )
                                            )}

                                        </div>

                                    )}

                                </div>

                            ))}

                        </ResumeSection>

                    )}


                    {/* =========================
                        CERTIFICATIONS
                    ========================== */}

                    {formData.certifications?.length > 0 && (

                        <ResumeSection title="Certifications">

                            {formData.certifications.map(
                                (certification, index) => (

                                    <div
                                        key={index}
                                        className="d-flex justify-content-between mb-2"
                                    >

                                        <div>

                                            <span
                                                className="fw-semibold"
                                                style={{ fontSize: "13px" }}
                                            >
                                                {certification.title}
                                            </span>

                                            {certification.issuingOrganization && (
                                                <span
                                                    className="text-muted"
                                                    style={{ fontSize: "13px" }}
                                                >
                                                    {" "}—{" "}
                                                    {certification.issuingOrganization}
                                                </span>
                                            )}

                                        </div>

                                        <span
                                            className="text-muted"
                                            style={{ fontSize: "12px" }}
                                        >
                                            {certification.year}
                                        </span>

                                    </div>

                                )
                            )}

                        </ResumeSection>

                    )}


                    {/* =========================
                        ACHIEVEMENTS
                    ========================== */}

                    {formData.achievements?.length > 0 && (

                        <ResumeSection title="Achievements">

                            {formData.achievements.map(
                                (achievement, index) => (

                                    <div
                                        key={index}
                                        className="mb-3"
                                    >

                                        <div className="d-flex justify-content-between">

                                            <span
                                                className="fw-semibold"
                                                style={{ fontSize: "13px" }}
                                            >
                                                {achievement.title}
                                            </span>

                                            <span
                                                className="text-muted"
                                                style={{ fontSize: "12px" }}
                                            >
                                                {achievement.year}
                                            </span>

                                        </div>

                                        {achievement.extraInformation && (
                                            <p
                                                className="text-muted mb-0 mt-1"
                                                style={{ fontSize: "12px" }}
                                            >
                                                {achievement.extraInformation}
                                            </p>
                                        )}

                                    </div>

                                )
                            )}

                        </ResumeSection>

                    )}


                    {/* =========================
                        LANGUAGES + INTERESTS
                    ========================== */}

                    <div className="row">

                        {formData.languages?.length > 0 && (

                            <div className="col-md-6">

                                <ResumeSection title="Languages">

                                    <div className="d-flex flex-wrap gap-2">

                                        {formData.languages.map(
                                            (language, index) => (

                                                <span
                                                    key={index}
                                                    className="badge text-bg-light border"
                                                >
                                                    {language.name}
                                                </span>

                                            )
                                        )}

                                    </div>

                                </ResumeSection>

                            </div>

                        )}


                        {formData.interests?.length > 0 && (

                            <div className="col-md-6">

                                <ResumeSection title="Interests">

                                    <div className="d-flex flex-wrap gap-2">

                                        {formData.interests.map(
                                            (interest, index) => (

                                                <span
                                                    key={index}
                                                    className="badge text-bg-light border"
                                                >
                                                    {interest.name}
                                                </span>

                                            )
                                        )}

                                    </div>

                                </ResumeSection>

                            </div>

                        )}

                    </div>

                </div>

            </div>


            {/* =========================
                BOTTOM DOWNLOAD
            ========================== */}

            <div className="container text-center mt-4 mb-5">

                <button
                    className="btn btn-primary btn-lg px-5"
                    onClick={downloadPDF}
                >
                    <i className="bi bi-file-earmark-pdf me-2"></i>
                    Download Resume PDF
                </button>

            </div>

        </div>
    );
}


/* ==========================================
   REUSABLE RESUME SECTION
========================================== */

function ResumeSection({ title, children }) {

    return (

        <section className="mb-4">

            <h5
                className="fw-bold text-primary border-bottom pb-2 mb-3"
                style={{ fontSize: "16px" }}
            >
                {title}
            </h5>

            {children}

        </section>

    );
}


export default ResumePreview;
