
import { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { studentSidebarItems } from "../sidebar/sidebarData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useSelector } from "react-redux";

function AiResumeDashboard() {

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user == null) {
            navigate("/signIn");
        }
    }, [user, navigate]);

    // =========================
    // AI PROMPT GENERATOR
    // =========================

    const submitHandler = async (e) => {

        e.preventDefault();

        if (!prompt.trim()) {
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(`${api}/chat`, {
                userQuery: prompt
            });

            console.log(response.data);

            navigate("/student/ai/resume/content", {
                state: {
                    data: response.data
                }
            });

        } catch (err) {

            console.log(err);

            navigate("/signIn");

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // AUTOMATIC RESUME
    // =========================

    const automaticResumeGenerator = async () => {

        if (!user?.object?.userId) {
            navigate("/signIn");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.get(
                `${api}/ai_generate_resume/${user.object.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            navigate("/student/ai/resume/content", {
                state: {
                    data: response.data
                }
            });

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // EXAMPLE PROMPT
    // =========================

    const usePrompt = (text) => {
        setPrompt(text);
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
                        HERO SECTION
                    ========================= */}

                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">

                        <div className="card-body p-4 p-md-5">

                            <div className="row align-items-center">

                                {/* LEFT */}

                                <div className="col-lg-8">

                                    <div className="d-inline-flex align-items-center bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3">

                                        <i className="bi bi-stars me-2"></i>

                                        <small className="fw-semibold">
                                            AI Powered Resume Builder
                                        </small>

                                    </div>


                                    <h1 className="display-5 fw-bold mb-3">

                                        Build a Resume That
                                        <span className="text-primary">
                                            {" "}Gets Noticed.
                                        </span>

                                    </h1>


                                    <p className="lead text-muted mb-4">

                                        Create a professional, job-ready resume
                                        using AI. Generate one automatically
                                        from your profile or tell AI exactly
                                        what kind of resume you want.

                                    </p>


                                    <div className="d-flex flex-column flex-sm-row gap-2">

                                        <button
                                            className="btn btn-primary btn-lg rounded-pill px-4"
                                            onClick={automaticResumeGenerator}
                                            disabled={loading}
                                        >

                                            {loading ? (

                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                    ></span>

                                                    Generating...
                                                </>

                                            ) : (

                                                <>
                                                    <i className="bi bi-magic me-2"></i>
                                                    Generate Automatically
                                                </>

                                            )}

                                        </button>


                                        <button
                                            className="btn btn-outline-primary btn-lg rounded-pill px-4"
                                            onClick={() => {
                                                document
                                                    .getElementById("promptSection")
                                                    ?.scrollIntoView({
                                                        behavior: "smooth"
                                                    });
                                            }}
                                        >

                                            <i className="bi bi-chat-left-text me-2"></i>

                                            Create with AI

                                        </button>

                                    </div>

                                </div>


                                {/* RIGHT */}

                                <div className="col-lg-4 d-none d-lg-block text-center">

                                    <div
                                        className="bg-primary-subtle rounded-circle mx-auto d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "190px",
                                            height: "190px"
                                        }}
                                    >

                                        <i
                                            className="bi bi-file-earmark-person-fill text-primary"
                                            style={{
                                                fontSize: "90px"
                                            }}
                                        ></i>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =========================
                        QUICK FEATURES
                    ========================= */}

                    <div className="row g-3 mb-4">

                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4">

                                    <div className="bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "48px",
                                            height: "48px"
                                        }}
                                    >

                                        <i className="bi bi-lightning-charge-fill fs-4"></i>

                                    </div>

                                    <h5 className="fw-bold">
                                        Generate Instantly
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Let AI create a complete resume
                                        using the information already
                                        available in your profile.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4">

                                    <div
                                        className="bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "48px",
                                            height: "48px"
                                        }}
                                    >

                                        <i className="bi bi-pencil-square fs-4"></i>

                                    </div>

                                    <h5 className="fw-bold">
                                        Customize with AI
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Describe the job or style you want
                                        and AI will create the resume
                                        according to your instructions.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4">

                                    <div
                                        className="bg-warning-subtle text-warning rounded-3 d-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "48px",
                                            height: "48px"
                                        }}
                                    >

                                        <i className="bi bi-briefcase-fill fs-4"></i>

                                    </div>

                                    <h5 className="fw-bold">
                                        Job Ready
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Generate a professional resume
                                        designed to highlight your skills,
                                        projects and achievements.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =========================
                        AI PROMPT SECTION
                    ========================= */}

                    <div
                        id="promptSection"
                        className="card border-0 shadow-sm rounded-4 mb-4"
                    >

                        <div className="card-body p-4 p-md-5">

                            <div className="text-center mb-4">

                                <div
                                    className="bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
                                    style={{
                                        width: "58px",
                                        height: "58px"
                                    }}
                                >

                                    <i className="bi bi-stars fs-4"></i>

                                </div>

                                <h3 className="fw-bold">
                                    Tell AI What Resume You Want
                                </h3>

                                <p className="text-muted">
                                    Describe your target job, experience,
                                    skills or resume style.
                                </p>

                            </div>


                            <form onSubmit={submitHandler}>

                                <div className="position-relative">

                                    <textarea
                                        className="form-control form-control-lg rounded-4"
                                        rows="6"
                                        value={prompt}
                                        onChange={(e) =>
                                            setPrompt(e.target.value)
                                        }
                                        placeholder="Example: Create a professional resume for a Java Full Stack Developer with experience in Spring Boot, React, MySQL and AWS..."
                                        style={{
                                            resize: "none"
                                        }}
                                    ></textarea>

                                    <div className="d-flex justify-content-between align-items-center mt-3">

                                        <small className="text-muted">

                                            <i className="bi bi-lightbulb me-1"></i>

                                            Be specific for better results

                                        </small>


                                        <button
                                            type="submit"
                                            className="btn btn-primary rounded-pill px-4"
                                            disabled={
                                                loading ||
                                                !prompt.trim()
                                            }
                                        >

                                            {loading ? (

                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                    ></span>

                                                    Creating Resume...
                                                </>

                                            ) : (

                                                <>
                                                    Generate Resume
                                                    <i className="bi bi-arrow-right ms-2"></i>
                                                </>

                                            )}

                                        </button>

                                    </div>

                                </div>

                            </form>

                        </div>

                    </div>


                   


                    {/* =========================
                        HOW IT WORKS
                    ========================= */}

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body p-4 p-md-5">

                            <div className="text-center mb-4">

                                <h4 className="fw-bold">
                                    How It Works
                                </h4>

                                <p className="text-muted">
                                    Create your professional resume in
                                    three simple steps.
                                </p>

                            </div>


                            <div className="row g-4 text-center">

                                <div className="col-md-4">

                                    <div
                                        className="bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "55px",
                                            height: "55px"
                                        }}
                                    >
                                        1
                                    </div>

                                    <h6 className="fw-bold">
                                        Provide Information
                                    </h6>

                                    <p className="small text-muted mb-0">
                                        Add your education, projects,
                                        skills and achievements to your
                                        profile.
                                    </p>

                                </div>


                                <div className="col-md-4">

                                    <div
                                        className="bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "55px",
                                            height: "55px"
                                        }}
                                    >
                                        2
                                    </div>

                                    <h6 className="fw-bold">
                                        Let AI Build It
                                    </h6>

                                    <p className="small text-muted mb-0">
                                        Our AI organizes your information
                                        into a professional resume.
                                    </p>

                                </div>


                                <div className="col-md-4">

                                    <div
                                        className="bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "55px",
                                            height: "55px"
                                        }}
                                    >
                                        3
                                    </div>

                                    <h6 className="fw-bold">
                                        Review & Download
                                    </h6>

                                    <p className="small text-muted mb-0">
                                        Review your resume, make changes
                                        and download the final version.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default AiResumeDashboard;

