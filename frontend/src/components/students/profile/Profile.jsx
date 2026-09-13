
import React, { useEffect, useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import { studentSidebarItems } from "../../sidebar/sidebarData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../api";

function Profile() {
    const { user } = useSelector((state) => state.auth);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // =========================
    // STATES
    // =========================

    const [projects, setProjects] = useState([]);
    const [education, setEducation] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [certifications, setCertifications] = useState([]);

    const [loading, setLoading] = useState(true);

    // Project
    const [projectForm, setProjectForm] = useState({
        title: "",
        description: "",
        technologyUsed: "",
        githubLink: "",
        demoLink: "",
    });

    // Education
    const [educationForm, setEducationForm] = useState({
        degree: "",
        university: "",
        graduationYear: "",
        location: "",
    });

    // Achievement
    const [achievementForm, setAchievementForm] = useState({
        title: "",
        year: "",
        extraInformation: "",
    });

    // Certification
    const [certificationForm, setCertificationForm] = useState({
        title: "",
        issuingOrganization: "",
        year: "",
    });

    // =========================
    // AUTH CHECK
    // =========================

    useEffect(() => {
        if (!user) {
            navigate("/signIn");
        }
    }, [user, navigate]);

    // =========================
    // LOAD ALL PROFILE DATA
    // =========================

    useEffect(() => {
        if (user?.object?.userId) {
            loadProfileData();
        }
    }, [user]);

    const loadProfileData = async () => {
        try {
            setLoading(true);

            const userId = user.object.userId;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const [
                projectResponse,
                educationResponse,
                achievementResponse,
                certificationResponse,
            ] = await Promise.all([
                axios.get(`${api}/get_project/${userId}`, config),
                axios.get(`${api}/get_education/${userId}`, config),
                axios.get(`${api}/get_achievement/${userId}`, config),
                axios.get(`${api}/get_certification/${userId}`, config),
            ]);

            setProjects(projectResponse.data.object || []);
            setEducation(educationResponse.data.object || []);
            setAchievements(achievementResponse.data.object || []);
            setCertifications(certificationResponse.data.object || []);

        } catch (error) {
            console.log("Error loading profile data:", error);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // FORM CHANGE HANDLERS
    // =========================

    const handleProjectChange = (e) => {
        const { name, value } = e.target;

        setProjectForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEducationChange = (e) => {
        const { name, value } = e.target;

        setEducationForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAchievementChange = (e) => {
        const { name, value } = e.target;

        setAchievementForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCertificationChange = (e) => {
        const { name, value } = e.target;

        setCertificationForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================
    // ADD PROJECT
    // =========================

    const submitProjectHandler = async (e) => {
        e.preventDefault();

        try {
            const userId = user.object.userId;

            const response = await axios.post(
                `${api}/add_project/${userId}`,
                projectForm,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);

            if (response.data.success) {
                setProjectForm({
                    title: "",
                    description: "",
                    technologyUsed: "",
                    githubLink: "",
                    demoLink: "",
                });

                await loadProfileData();

                document.getElementById("closeProjectModal").click();
            }
        } catch (error) {
            console.log("Project error:", error);
        }
    };

    // =========================
    // ADD EDUCATION
    // =========================

    const submitEducationHandler = async (e) => {
        e.preventDefault();

        try {
            const userId = user.object.userId;

            const response = await axios.post(
                `${api}/add_education/${userId}`,
                educationForm,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);

            if (response.data.success) {
                setEducationForm({
                    degree: "",
                    university: "",
                    graduationYear: "",
                    location: "",
                });

                await loadProfileData();

                document.getElementById("closeEducationModal").click();
            }
        } catch (error) {
            console.log("Education error:", error);
        }
    };

    // =========================
    // ADD ACHIEVEMENT
    // =========================

    const submitAchievementHandler = async (e) => {
        e.preventDefault();

        try {
            const userId = user.object.userId;

            const response = await axios.post(
                `${api}/add_achievement/${userId}`,
                achievementForm,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);

            if (response.data.success) {
                setAchievementForm({
                    title: "",
                    year: "",
                    extraInformation: "",
                });

                await loadProfileData();

                document.getElementById("closeAchievementModal").click();
            }
        } catch (error) {
            console.log("Achievement error:", error);
        }
    };

    // =========================
    // ADD CERTIFICATION
    // =========================

    const submitCertificationHandler = async (e) => {
        e.preventDefault();

        try {
            const userId = user.object.userId;

            const response = await axios.post(
                `${api}/add_certification/${userId}`,
                certificationForm,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);

            if (response.data.success) {
                setCertificationForm({
                    title: "",
                    issuingOrganization: "",
                    year: "",
                });

                await loadProfileData();

                document.getElementById("closeCertificationModal").click();
            }
        } catch (error) {
            console.log("Certification error:", error);
        }
    };

    // =========================
    // SECTION HEADER
    // =========================

    const SectionHeader = ({ icon, title, buttonText, target }) => {
        return (
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                    <div
                        className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center"
                        style={{ width: "42px", height: "42px" }}
                    >
                        <i className={`bi ${icon} fs-5`}></i>
                    </div>

                    <div>
                        <h5 className="fw-bold mb-0">{title}</h5>
                    </div>
                </div>

                <button
                    className="btn btn-primary btn-sm rounded-pill px-3"
                    data-bs-toggle="modal"
                    data-bs-target={`#${target}`}
                >
                    <i className="bi bi-plus-lg me-1"></i>
                    {buttonText}
                </button>
            </div>
        );
    };

    // =========================
    // EMPTY STATE
    // =========================

    const EmptyState = ({ icon, message }) => {
        return (
            <div className="text-center py-4 bg-light rounded-4 border">
                <i className={`bi ${icon} display-6 text-secondary`}></i>
                <p className="text-muted mb-0 mt-2">{message}</p>
            </div>
        );
    };

    if (!user) {
        return null;
    }

    return (
        <div className="d-flex min-vh-100 bg-light">

            {/* =========================
                SIDEBAR
            ========================= */}

            <Sidebar items={studentSidebarItems} />

            {/* =========================
                RIGHT SIDE
            ========================= */}

            <main className="flex-grow-1 p-3 p-md-4">

                <div className="container-fluid">

                    {/* =========================
                        PROFILE HEADER
                    ========================= */}

                    <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">

                        <div className="bg-primary" style={{ height: "100px" }}></div>

                        <div className="card-body px-4 pb-4">

                            <div className="d-flex flex-column flex-md-row align-items-md-end gap-3">

                                <div
                                    className="bg-white rounded-circle shadow d-flex align-items-center justify-content-center text-primary fw-bold"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        marginTop: "-55px",
                                        fontSize: "38px",
                                    }}
                                >
                                    {user.object.name
                                        ? user.object.name.charAt(0).toUpperCase()
                                        : "U"}
                                </div>

                                <div className="flex-grow-1">

                                    <h3 className="fw-bold mb-1">
                                        {user.object.name}
                                    </h3>

                                    <div className="text-muted mb-2">
                                        <i className="bi bi-envelope me-2"></i>
                                        {user.object.email}
                                    </div>

                                    <div className="text-muted">
                                        <i className="bi bi-telephone me-2"></i>
                                        {user.object.phone}
                                    </div>

                                </div>

                                <button className="btn btn-outline-primary rounded-pill px-4">
                                    <i className="bi bi-pencil me-2"></i>
                                    Edit Profile
                                </button>

                            </div>
                        </div>
                    </div>


                    {/* =========================
                        LOADING
                    ========================= */}

                    {loading ? (

                        <div className="text-center py-5">
                            <div
                                className="spinner-border text-primary"
                                role="status"
                            ></div>

                            <p className="text-muted mt-3">
                                Loading your profile...
                            </p>
                        </div>

                    ) : (

                        <>

                            {/* =========================
                                EDUCATION
                            ========================= */}

                            <div className="card border-0 shadow-sm rounded-4 mb-4">

                                <div className="card-body p-4">

                                    <SectionHeader
                                        icon="bi-mortarboard-fill"
                                        title="Education"
                                        buttonText="Add Education"
                                        target="educationModal"
                                    />

                                    {education.length === 0 ? (

                                        <EmptyState
                                            icon="bi-mortarboard"
                                            message="No education details added yet."
                                        />

                                    ) : (

                                        <div className="row g-3">

                                            {education.map((edu) => (

                                                <div
                                                    className="col-12 col-md-6"
                                                    key={edu.educationId}
                                                >

                                                    <div className="border rounded-4 p-3 h-100">

                                                        <div className="d-flex gap-3">

                                                            <div className="bg-primary-subtle text-primary rounded-3 p-3">
                                                                <i className="bi bi-mortarboard-fill fs-4"></i>
                                                            </div>

                                                            <div>
                                                                <h6 className="fw-bold mb-1">
                                                                    {edu.degree}
                                                                </h6>

                                                                <div className="text-muted">
                                                                    {edu.university}
                                                                </div>

                                                                <div className="small text-muted mt-2">
                                                                    <i className="bi bi-calendar3 me-1"></i>
                                                                    {edu.graduationYear}

                                                                    {edu.location && (
                                                                        <>
                                                                            <span className="mx-2">•</span>
                                                                            <i className="bi bi-geo-alt me-1"></i>
                                                                            {edu.location}
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            ))}

                                        </div>

                                    )}

                                </div>
                            </div>


                            {/* =========================
                                PROJECTS
                            ========================= */}

                            <div className="card border-0 shadow-sm rounded-4 mb-4">

                                <div className="card-body p-4">

                                    <SectionHeader
                                        icon="bi-code-square"
                                        title="Projects"
                                        buttonText="Add Project"
                                        target="projectModal"
                                    />

                                    {projects.length === 0 ? (

                                        <EmptyState
                                            icon="bi-folder2-open"
                                            message="No projects added yet."
                                        />

                                    ) : (

                                        <div className="row g-3">

                                            {projects.map((project) => (

                                                <div
                                                    className="col-12 col-lg-6"
                                                    key={project.projectId || project.id}
                                                >

                                                    <div className="border rounded-4 p-4 h-100">

                                                        <div className="d-flex justify-content-between">

                                                            <h6 className="fw-bold">
                                                                {project.title}
                                                            </h6>

                                                            <i className="bi bi-code-slash text-primary fs-5"></i>

                                                        </div>

                                                        <p className="text-muted small mt-2">
                                                            {project.description}
                                                        </p>

                                                        {project.technologyUsed && (

                                                            <div className="mb-3">

                                                                {project.technologyUsed
                                                                    .split(",")
                                                                    .map((tech, index) => (

                                                                        <span
                                                                            key={index}
                                                                            className="badge text-bg-light border me-1 mb-1"
                                                                        >
                                                                            {tech.trim()}
                                                                        </span>

                                                                    ))}

                                                            </div>

                                                        )}

                                                        <div className="d-flex gap-2">

                                                            {project.githubLink && (

                                                                <a
                                                                    href={project.githubLink}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="btn btn-dark btn-sm rounded-pill"
                                                                >
                                                                    <i className="bi bi-github me-1"></i>
                                                                    GitHub
                                                                </a>

                                                            )}

                                                            {project.demoLink && (

                                                                <a
                                                                    href={project.demoLink}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="btn btn-outline-primary btn-sm rounded-pill"
                                                                >
                                                                    <i className="bi bi-box-arrow-up-right me-1"></i>
                                                                    Live Demo
                                                                </a>

                                                            )}

                                                        </div>

                                                    </div>

                                                </div>

                                            ))}

                                        </div>

                                    )}

                                </div>
                            </div>


                            {/* =========================
                                ACHIEVEMENTS
                            ========================= */}

                            <div className="card border-0 shadow-sm rounded-4 mb-4">

                                <div className="card-body p-4">

                                    <SectionHeader
                                        icon="bi-trophy-fill"
                                        title="Achievements"
                                        buttonText="Add Achievement"
                                        target="achievementModal"
                                    />

                                    {achievements.length === 0 ? (

                                        <EmptyState
                                            icon="bi-trophy"
                                            message="No achievements added yet."
                                        />

                                    ) : (

                                        <div className="row g-3">

                                            {achievements.map((achievement) => (

                                                <div
                                                    className="col-12 col-md-6"
                                                    key={achievement.achievementId}
                                                >

                                                    <div className="border rounded-4 p-4 h-100">

                                                        <div className="d-flex gap-3">

                                                            <div className="bg-warning-subtle text-warning rounded-3 p-3">
                                                                <i className="bi bi-trophy-fill fs-4"></i>
                                                            </div>

                                                            <div className="flex-grow-1">

                                                                <div className="d-flex justify-content-between gap-2">

                                                                    <h6 className="fw-bold mb-1">
                                                                        {achievement.title}
                                                                    </h6>

                                                                    <span className="badge text-bg-light border">
                                                                        {achievement.year}
                                                                    </span>

                                                                </div>

                                                                <p className="text-muted small mb-0 mt-2">
                                                                    {achievement.extraInformation}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            ))}

                                        </div>

                                    )}

                                </div>
                            </div>


                            {/* =========================
                                CERTIFICATIONS
                            ========================= */}

                            <div className="card border-0 shadow-sm rounded-4 mb-4">

                                <div className="card-body p-4">

                                    <SectionHeader
                                        icon="bi-patch-check-fill"
                                        title="Certifications"
                                        buttonText="Add Certification"
                                        target="certificationModal"
                                    />

                                    {certifications.length === 0 ? (

                                        <EmptyState
                                            icon="bi-patch-check"
                                            message="No certifications added yet."
                                        />

                                    ) : (

                                        <div className="row g-3">

                                            {certifications.map((certification) => (

                                                <div
                                                    className="col-12 col-md-6"
                                                    key={certification.certificationId}
                                                >

                                                    <div className="border rounded-4 p-4 h-100">

                                                        <div className="d-flex gap-3">

                                                            <div className="bg-success-subtle text-success rounded-3 p-3">
                                                                <i className="bi bi-patch-check-fill fs-4"></i>
                                                            </div>

                                                            <div className="flex-grow-1">

                                                                <div className="d-flex justify-content-between gap-2">

                                                                    <h6 className="fw-bold mb-1">
                                                                        {certification.title}
                                                                    </h6>

                                                                    <span className="badge text-bg-light border">
                                                                        {certification.year}
                                                                    </span>

                                                                </div>

                                                                <div className="text-muted small mt-2">
                                                                    <i className="bi bi-building me-1"></i>
                                                                    {certification.issuingOrganization}
                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            ))}

                                        </div>

                                    )}

                                </div>
                            </div>

                        </>
                    )}

                </div>
            </main>


            {/* =====================================================
                PROJECT MODAL
            ===================================================== */}

            <div
                className="modal fade"
                id="projectModal"
                tabIndex="-1"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-lg modal-dialog-centered">

                    <div className="modal-content border-0 rounded-4 shadow">

                        <div className="modal-header border-0 px-4 pt-4">

                            <div>
                                <h5 className="fw-bold mb-1">
                                    <i className="bi bi-code-square text-primary me-2"></i>
                                    Add New Project
                                </h5>

                                <small className="text-muted">
                                    Add your project details to your profile.
                                </small>
                            </div>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <form onSubmit={submitProjectHandler}>

                            <div className="modal-body px-4">

                                <div className="row g-3">

                                    <div className="col-12">

                                        <label className="form-label fw-semibold">
                                            Project Title
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={projectForm.title}
                                            onChange={handleProjectChange}
                                            placeholder="e.g. Alumni Management System"
                                            required
                                        />

                                    </div>

                                    <div className="col-12">

                                        <label className="form-label fw-semibold">
                                            Description
                                        </label>

                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            name="description"
                                            value={projectForm.description}
                                            onChange={handleProjectChange}
                                            placeholder="Describe your project..."
                                            required
                                        ></textarea>

                                    </div>

                                    <div className="col-12">

                                        <label className="form-label fw-semibold">
                                            Technologies Used
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="technologyUsed"
                                            value={projectForm.technologyUsed}
                                            onChange={handleProjectChange}
                                            placeholder="React, Spring Boot, MySQL"
                                        />

                                        <small className="text-muted">
                                            Separate technologies with commas.
                                        </small>

                                    </div>

                                    <div className="col-md-6">

                                        <label className="form-label fw-semibold">
                                            GitHub Link
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">
                                                <i className="bi bi-github"></i>
                                            </span>

                                            <input
                                                type="url"
                                                className="form-control"
                                                name="githubLink"
                                                value={projectForm.githubLink}
                                                onChange={handleProjectChange}
                                                placeholder="https://github.com/..."
                                            />

                                        </div>

                                    </div>

                                    <div className="col-md-6">

                                        <label className="form-label fw-semibold">
                                            Demo Link
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">
                                                <i className="bi bi-link-45deg"></i>
                                            </span>

                                            <input
                                                type="url"
                                                className="form-control"
                                                name="demoLink"
                                                value={projectForm.demoLink}
                                                onChange={handleProjectChange}
                                                placeholder="https://..."
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="modal-footer border-0 px-4 pb-4">

                                <button
                                    type="button"
                                    className="btn btn-light rounded-pill px-4"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-pill px-4"
                                >
                                    <i className="bi bi-plus-lg me-2"></i>
                                    Add Project
                                </button>

                            </div>

                        </form>

                        <button
                            id="closeProjectModal"
                            data-bs-dismiss="modal"
                            className="d-none"
                        ></button>

                    </div>
                </div>
            </div>


            {/* =====================================================
                EDUCATION MODAL
            ===================================================== */}

            <div
                className="modal fade"
                id="educationModal"
                tabIndex="-1"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-lg modal-dialog-centered">

                    <div className="modal-content border-0 rounded-4 shadow">

                        <div className="modal-header border-0 px-4 pt-4">

                            <div>
                                <h5 className="fw-bold mb-1">
                                    <i className="bi bi-mortarboard-fill text-primary me-2"></i>
                                    Add Education
                                </h5>

                                <small className="text-muted">
                                    Add your academic qualification.
                                </small>
                            </div>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <form onSubmit={submitEducationHandler}>

                            <div className="modal-body px-4">

                                <div className="row g-3">

                                    <div className="col-md-6">

                                        <label className="form-label fw-semibold">
                                            Degree
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="degree"
                                            value={educationForm.degree}
                                            onChange={handleEducationChange}
                                            placeholder="B.Tech Computer Science"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label className="form-label fw-semibold">
                                            University / College
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="university"
                                            value={educationForm.university}
                                            onChange={handleEducationChange}
                                            placeholder="University name"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label className="form-label fw-semibold">
                                            Graduation Year
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="graduationYear"
                                            value={educationForm.graduationYear}
                                            onChange={handleEducationChange}
                                            placeholder="2027"
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label className="form-label fw-semibold">
                                            Location
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="location"
                                            value={educationForm.location}
                                            onChange={handleEducationChange}
                                            placeholder="Indore, Madhya Pradesh"
                                        />

                                    </div>

                                </div>

                            </div>

                            <div className="modal-footer border-0 px-4 pb-4">

                                <button
                                    type="button"
                                    className="btn btn-light rounded-pill px-4"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-pill px-4"
                                >
                                    <i className="bi bi-plus-lg me-2"></i>
                                    Add Education
                                </button>

                            </div>

                        </form>

                        <button
                            id="closeEducationModal"
                            data-bs-dismiss="modal"
                            className="d-none"
                        ></button>

                    </div>
                </div>
            </div>


            {/* =====================================================
                ACHIEVEMENT MODAL
            ===================================================== */}

            <div
                className="modal fade"
                id="achievementModal"
                tabIndex="-1"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-dialog-centered">

                    <div className="modal-content border-0 rounded-4 shadow">

                        <div className="modal-header border-0 px-4 pt-4">

                            <div>
                                <h5 className="fw-bold mb-1">
                                    <i className="bi bi-trophy-fill text-warning me-2"></i>
                                    Add Achievement
                                </h5>

                                <small className="text-muted">
                                    Showcase your achievements.
                                </small>
                            </div>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <form onSubmit={submitAchievementHandler}>

                            <div className="modal-body px-4">

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Achievement Title
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={achievementForm.title}
                                        onChange={handleAchievementChange}
                                        placeholder="e.g. Hackathon Winner"
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Year
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="year"
                                        value={achievementForm.year}
                                        onChange={handleAchievementChange}
                                        placeholder="2026"
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Extra Information
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        name="extraInformation"
                                        value={achievementForm.extraInformation}
                                        onChange={handleAchievementChange}
                                        placeholder="Tell us more about this achievement..."
                                    ></textarea>

                                </div>

                            </div>

                            <div className="modal-footer border-0 px-4 pb-4">

                                <button
                                    type="button"
                                    className="btn btn-light rounded-pill px-4"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-pill px-4"
                                >
                                    <i className="bi bi-plus-lg me-2"></i>
                                    Add Achievement
                                </button>

                            </div>

                        </form>

                        <button
                            id="closeAchievementModal"
                            data-bs-dismiss="modal"
                            className="d-none"
                        ></button>

                    </div>
                </div>
            </div>


            {/* =====================================================
                CERTIFICATION MODAL
            ===================================================== */}

            <div
                className="modal fade"
                id="certificationModal"
                tabIndex="-1"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-dialog-centered">

                    <div className="modal-content border-0 rounded-4 shadow">

                        <div className="modal-header border-0 px-4 pt-4">

                            <div>
                                <h5 className="fw-bold mb-1">
                                    <i className="bi bi-patch-check-fill text-success me-2"></i>
                                    Add Certification
                                </h5>

                                <small className="text-muted">
                                    Add your professional certification.
                                </small>
                            </div>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <form onSubmit={submitCertificationHandler}>

                            <div className="modal-body px-4">

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Certification Title
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={certificationForm.title}
                                        onChange={handleCertificationChange}
                                        placeholder="e.g. Java Programming Certification"
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Issuing Organization
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="issuingOrganization"
                                        value={certificationForm.issuingOrganization}
                                        onChange={handleCertificationChange}
                                        placeholder="e.g. Oracle"
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Year
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="year"
                                        value={certificationForm.year}
                                        onChange={handleCertificationChange}
                                        placeholder="2026"
                                        required
                                    />

                                </div>

                            </div>

                            <div className="modal-footer border-0 px-4 pb-4">

                                <button
                                    type="button"
                                    className="btn btn-light rounded-pill px-4"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-pill px-4"
                                >
                                    <i className="bi bi-plus-lg me-2"></i>
                                    Add Certification
                                </button>

                            </div>

                        </form>

                        <button
                            id="closeCertificationModal"
                            data-bs-dismiss="modal"
                            className="d-none"
                        ></button>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;
