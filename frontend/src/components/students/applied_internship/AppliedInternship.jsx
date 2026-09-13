import { useEffect, useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import { studentSidebarItems } from "../../sidebar/sidebarData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../api";

function AppliedInternship() {

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (user == null) {
            navigate("/signIn");
        }
    }, [user, navigate]);

    useEffect(() => {

        if (!user) return;

        axios.get(
            `${api}/get_student_applied_intern/${user.object.userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((obj) => {
            console.log(obj.data);
            setData(obj.data.object || []);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        });

    }, [user, token]);

    return (

        <div className="d-flex min-vh-100 bg-light">

            {/* Sidebar */}
            <Sidebar items={studentSidebarItems} />

            {/* Main Area */}
            <main className="flex-grow-1 p-3 p-md-4">

                <div className="container-fluid p-0">

                    {/* Page Header */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

                        <div>
                            <h3 className="fw-bold text-primary mb-1">
                                <i className="bi bi-briefcase-fill me-2"></i>
                                Applied Internships
                            </h3>

                            <p className="text-muted mb-0">
                                Track the internships you have applied for.
                            </p>
                        </div>

                        <div className="mt-3 mt-md-0">
                            <span className="badge bg-primary-subtle text-primary fs-6 px-3 py-2">
                                {data.length} Application{data.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                    </div>


                    {/* Loading */}
                    {loading && (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            ></div>

                            <p className="text-muted mt-3">
                                Loading your applications...
                            </p>

                        </div>

                    )}


                    {/* Empty State */}
                    {!loading && data.length === 0 && (

                        <div className="card border-0 shadow-sm text-center py-5">

                            <div className="card-body">

                                <div
                                    className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{
                                        width: "70px",
                                        height: "70px"
                                    }}
                                >
                                    <i className="bi bi-briefcase fs-2"></i>
                                </div>

                                <h5 className="fw-bold">
                                    No internships applied yet
                                </h5>

                                <p className="text-muted mb-3">
                                    You haven't applied for any internships.
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/internship")}
                                >
                                    <i className="bi bi-search me-2"></i>
                                    Find Internships
                                </button>

                            </div>

                        </div>

                    )}


                    {/* Internship Cards */}
                    {!loading && data.length > 0 && (

                        <div className="row g-4">

                            {data.map((internship, index) => (

                                <div
                                    className="col-12 col-xl-6"
                                    key={index}
                                >

                                    <div className="card border-0 shadow-sm h-100">

                                        {/* Card Header */}
                                        <div className="card-body p-4">

                                            <div className="d-flex justify-content-between align-items-start mb-3">

                                                <div className="d-flex align-items-center">

                                                    <div
                                                        className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center me-3"
                                                        style={{
                                                            width: "50px",
                                                            height: "50px"
                                                        }}
                                                    >
                                                        <i className="bi bi-building fs-4"></i>
                                                    </div>

                                                    <div>

                                                        <h5 className="fw-bold mb-1">
                                                            {internship.title}
                                                        </h5>

                                                        <div className="text-muted">
                                                            <i className="bi bi-building me-1"></i>
                                                            {internship.company}
                                                        </div>

                                                    </div>

                                                </div>


                                                {/* Application Status */}
                                                <span
                                                    className={`badge ${
                                                        internship.appStatus === "PENDING"
                                                            ? "bg-warning-subtle text-warning-emphasis"
                                                            : internship.appStatus === "ACCEPTED"
                                                            ? "bg-success-subtle text-success"
                                                            : "bg-danger-subtle text-danger"
                                                    } px-3 py-2`}
                                                >
                                                    {internship.appStatus}
                                                </span>

                                            </div>


                                            {/* Internship Details */}
                                            <div className="row g-3 mb-3">

                                                <div className="col-6">

                                                    <div className="bg-light rounded-3 p-3">

                                                        <small className="text-muted d-block">
                                                            <i className="bi bi-geo-alt me-1"></i>
                                                            Location
                                                        </small>

                                                        <span className="fw-semibold">
                                                            {internship.location}
                                                        </span>

                                                    </div>

                                                </div>


                                                <div className="col-6">

                                                    <div className="bg-light rounded-3 p-3">

                                                        <small className="text-muted d-block">
                                                            <i className="bi bi-laptop me-1"></i>
                                                            Mode
                                                        </small>

                                                        <span className="fw-semibold">
                                                            {internship.mode}
                                                        </span>

                                                    </div>

                                                </div>


                                                <div className="col-6">

                                                    <div className="bg-light rounded-3 p-3">

                                                        <small className="text-muted d-block">
                                                            <i className="bi bi-calendar3 me-1"></i>
                                                            Duration
                                                        </small>

                                                        <span className="fw-semibold">
                                                            {internship.duration}
                                                        </span>

                                                    </div>

                                                </div>


                                                <div className="col-6">

                                                    <div className="bg-light rounded-3 p-3">

                                                        <small className="text-muted d-block">
                                                            <i className="bi bi-currency-rupee me-1"></i>
                                                            Stipend
                                                        </small>

                                                        <span className="fw-semibold">
                                                            ₹{internship.stipend}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* Skills */}
                                            <div className="mb-3">

                                                <small className="text-muted d-block mb-2">
                                                    <i className="bi bi-stars me-1"></i>
                                                    Skills Required
                                                </small>

                                                <div className="d-flex flex-wrap gap-2">

                                                    {internship.skillRequired
                                                        ?.split(",")
                                                        .map((skill, i) => (

                                                            <span
                                                                key={i}
                                                                className="badge bg-primary-subtle text-primary px-2 py-2"
                                                            >
                                                                {skill.trim()}
                                                            </span>

                                                        ))
                                                    }

                                                </div>

                                            </div>


                                            {/* Description */}
                                            {internship.description && (

                                                <p className="text-muted small mb-0">
                                                    {internship.description}
                                                </p>

                                            )}

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}

export default AppliedInternship;