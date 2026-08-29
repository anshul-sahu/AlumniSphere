import { useEffect, useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import { alumniSidebarItems } from "../../sidebar/sidebarData";
import axios from "axios";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Uploaded() {
    const [intern, setIntern] = useState([]);
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (user == null) {
            navigate("/signIn");
        }
    }, [user, navigate]);


    /* Fetch Uploaded Internships */

    useEffect(() => {
        if (!user?.object?.userId) {
            return;
        }

        axios
            .get(
                `${api}/uploaded_internship/${user.object.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((object) => {
                console.log(object.data);

                setIntern(object.data.object || []);
            })
            .catch((err) => {
                console.log(err);

                if (err.response?.status === 401) {
                    navigate("/signIn");
                }
            });

    }, [user, token, navigate]);


    /* Change Internship Status */

    const handleStatusChange = (internshipId, status) => {

        console.log(
            "Internship ID:",
            internshipId,
            "New Status:",
            status
        );

        /*
            Connect your backend API here.

            Example:

            axios.put(
                `${api}/internship/${internshipId}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        */

        // Temporary UI update
        setIntern((previousInternships) =>
            previousInternships.map((item) =>
                item.internshipId === internshipId
                    ? {
                        ...item,
                        status: status,
                    }
                    : item
            )
        );
    };


    return (
        <div className="d-flex min-vh-100 bg-light">

            {/* Sidebar */}
            <Sidebar items={alumniSidebarItems} />


            {/* Main Content */}
            <main className="flex-grow-1 p-3 p-md-4">

                <div className="container-fluid p-0">


                    {/* Page Header */}

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

                        <div>
                            <h2 className="fw-bold mb-1">

                                <i className="bi bi-briefcase-fill text-primary me-2"></i>

                                Uploaded Internships

                            </h2>

                            <p className="text-muted mb-0">

                                Manage your internship opportunities and update
                                their availability.

                            </p>
                        </div>


                       

                    </div>


                    {/* No Internship */}

                    {intern.length === 0 && (

                        <div className="card border-0 shadow-sm rounded-4">

                            <div className="card-body text-center py-5">

                                <i className="bi bi-briefcase display-3 text-muted"></i>

                                <h4 className="fw-bold mt-3">
                                    No Internships Uploaded
                                </h4>

                                <p className="text-muted mb-4">
                                    You have not posted any internship
                                    opportunities yet.
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        navigate("/alumni/upload-internship")
                                    }
                                >
                                    <i className="bi bi-plus-circle me-2"></i>

                                    Post Your First Internship
                                </button>

                            </div>

                        </div>

                    )}


                    {/* Internship Cards */}

                    <div className="row g-4">

                        {intern.map((item) => (

                            <div
                                className="col-12 col-lg-6 col-xl-4"
                                key={item.internshipId}
                            >

                                <div className="card border-0 shadow-sm rounded-4 h-100">

                                    <div className="card-body p-4 d-flex flex-column">


                                        {/* Title and Status */}

                                        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">

                                            <div>

                                                <h5 className="fw-bold mb-1">
                                                    {item.title}
                                                </h5>

                                                <div className="text-muted">
                                                    <i className="bi bi-building me-1"></i>

                                                    {item.company}
                                                </div>

                                            </div>


                                            {/* Current Status */}

                                            {item.status === "ACTIVE" && (
                                                <span className="badge text-bg-success">
                                                    ACTIVE
                                                </span>
                                            )}

                                            {item.status === "CLOSED" && (
                                                <span className="badge text-bg-danger">
                                                    CLOSED
                                                </span>
                                            )}

                                            {item.status === "DRAFT" && (
                                                <span className="badge text-bg-secondary">
                                                    DRAFT
                                                </span>
                                            )}

                                        </div>


                                        {/* Description */}

                                        <p className="text-muted small">
                                            {item.description}
                                        </p>


                                        <hr />


                                        {/* Internship Details */}

                                        <div className="row g-3 small mb-4">

                                            <div className="col-6">

                                                <div className="text-muted">
                                                    <i className="bi bi-geo-alt me-1"></i>

                                                    Location
                                                </div>

                                                <div className="fw-semibold">
                                                    {item.location}
                                                </div>

                                            </div>


                                            <div className="col-6">

                                                <div className="text-muted">
                                                    <i className="bi bi-laptop me-1"></i>

                                                    Mode
                                                </div>

                                                <div className="fw-semibold">
                                                    {item.mode}
                                                </div>

                                            </div>


                                            <div className="col-6">

                                                <div className="text-muted">
                                                    <i className="bi bi-clock me-1"></i>

                                                    Duration
                                                </div>

                                                <div className="fw-semibold">
                                                    {item.duration}
                                                </div>

                                            </div>


                                            <div className="col-6">

                                                <div className="text-muted">
                                                    <i className="bi bi-currency-rupee me-1"></i>

                                                    Stipend
                                                </div>

                                                <div className="fw-semibold">
                                                    ₹ {item.stipend}
                                                </div>

                                            </div>


                                            <div className="col-12">

                                                <div className="text-muted">
                                                    <i className="bi bi-tools me-1"></i>

                                                    Skills Required
                                                </div>

                                                <div className="fw-semibold">
                                                    {item.skillRequired}
                                                </div>

                                            </div>


                                            <div className="col-12">

                                                <div className="text-muted">
                                                    <i className="bi bi-calendar-event me-1"></i>

                                                    Application Deadline
                                                </div>

                                                <div className="fw-semibold">

                                                    {item.applyDeadline
                                                        ? new Date(
                                                            item.applyDeadline
                                                        ).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric",
                                                            }
                                                        )
                                                        : "Not available"
                                                    }

                                                </div>

                                            </div>

                                        </div>


                                        {/* Push buttons to bottom */}

                                        <div className="mt-auto">


                                            <div className="border-top pt-3">

                                                <div className="small text-muted mb-2">

                                                    Change Internship Status

                                                </div>


                                                {/* Responsive Status Buttons */}

                                                <div className="d-grid gap-2">

                                                    <button
                                                        type="button"
                                                        className={`btn ${
                                                            item.status === "ACTIVE"
                                                                ? "btn-success"
                                                                : "btn-outline-success"
                                                        }`}
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                item.internshipId,
                                                                "ACTIVE"
                                                            )
                                                        }
                                                    >

                                                        <i className="bi bi-check-circle me-2"></i>

                                                        ACTIVE

                                                    </button>


                                                    <button
                                                        type="button"
                                                        className={`btn ${
                                                            item.status === "CLOSED"
                                                                ? "btn-danger"
                                                                : "btn-outline-danger"
                                                        }`}
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                item.internshipId,
                                                                "CLOSED"
                                                            )
                                                        }
                                                    >

                                                        <i className="bi bi-x-circle me-2"></i>

                                                        CLOSED

                                                    </button>


                                                    <button
                                                        type="button"
                                                        className={`btn ${
                                                            item.status === "DRAFT"
                                                                ? "btn-secondary"
                                                                : "btn-outline-secondary"
                                                        }`}
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                item.internshipId,
                                                                "DRAFT"
                                                            )
                                                        }
                                                    >

                                                        <i className="bi bi-file-earmark me-2"></i>

                                                        DRAFT

                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Uploaded;