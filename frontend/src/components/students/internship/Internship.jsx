import { useEffect, useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import { studentSidebarItems } from "../../sidebar/sidebarData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../api";

function Internship() {

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [internships, setInternships] = useState([]);

    // Default: Active internships
    const [showExpired, setShowExpired] = useState(false);


    /* Authentication Check */

    useEffect(() => {
        if (user == null) {
            navigate("/signIn");
        }
    }, [user, navigate]);


    /* Fetch Internships */

    useEffect(() => {

        axios.get(
            `${api}/student/internships`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((object) => {

            console.log(object.data);

            setInternships(object.data.object || []);

        })
        .catch((err) => {

            console.log(err);

            if (err.response?.status === 401) {
                navigate("/signIn");
            }

        });

    }, [token, navigate]);


    /* Apply For Internship */

    const applyForInternship = (internshipId) => {

        axios.post(
            `${api}/apply_for_internship/${user.object.userId}/${internshipId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((object) => {

            console.log(object.data);

            alert("Application submitted successfully!");

        })
        .catch((err) => {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Unable to apply for this internship."
            );

        });

    };


    /*
        Convert today's date to midnight.
        This makes date comparison accurate.
    */

    const today = new Date();

    today.setHours(0, 0, 0, 0);


    /*
        Active internships:
        - Status must be ACTIVE
        - Application deadline must be today or in future
    */

    const activeInternships = internships.filter((internship) => {

        const deadline = new Date(internship.applyDeadline);

        deadline.setHours(0, 0, 0, 0);

        return (
            internship.status === "ACTIVE" &&
            deadline >= today
        );

    });


    /*
        Expired internships:
        Deadline has already passed
    */

    const expiredInternships = internships.filter((internship) => {

        const deadline = new Date(internship.applyDeadline);

        deadline.setHours(0, 0, 0, 0);

        return deadline < today;

    });


    /*
        Decide which internships to display
    */

    const displayedInternships = showExpired
        ? expiredInternships
        : activeInternships;


    return (
        <div className="d-flex min-vh-100 bg-light">

            {/* Sidebar */}

            <Sidebar items={studentSidebarItems} />


            {/* Main Content */}

            <main className="flex-grow-1 p-3 p-md-4">

                <div className="container-fluid p-0">


                    {/* Page Header */}

                    <div className="mb-4">

                        <h2 className="fw-bold mb-1">

                            <i className="bi bi-briefcase-fill text-primary me-2"></i>

                            Internship Opportunities

                        </h2>

                        <p className="text-muted mb-0">

                            Explore internship opportunities shared by alumni
                            and take the next step in your career.

                        </p>

                    </div>


                    {/* Filter Buttons */}

                    <div className="card border-0 shadow-sm rounded-4 mb-4">

                        <div className="card-body p-3 p-md-4">

                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">

                                <div>

                                    <h5 className="fw-bold mb-1">

                                        {showExpired
                                            ? "Expired Internships"
                                            : "Available Internships"
                                        }

                                    </h5>

                                    <small className="text-muted">

                                        {showExpired
                                            ? "These internship application deadlines have passed."
                                            : "These internships are currently open for applications."
                                        }

                                    </small>

                                </div>


                                <div
                                    className="btn-group w-100 w-sm-auto"
                                    role="group"
                                >

                                    <button
                                        type="button"
                                        className={
                                            !showExpired
                                                ? "btn btn-primary"
                                                : "btn btn-outline-primary"
                                        }
                                        onClick={() =>
                                            setShowExpired(false)
                                        }
                                    >

                                        <i className="bi bi-briefcase-check me-2"></i>

                                        Available

                                    </button>


                                    <button
                                        type="button"
                                        className={
                                            showExpired
                                                ? "btn btn-secondary"
                                                : "btn btn-outline-secondary"
                                        }
                                        onClick={() =>
                                            setShowExpired(true)
                                        }
                                    >

                                        <i className="bi bi-clock-history me-2"></i>

                                        Expired

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* No Internships */}

                    {displayedInternships.length === 0 && (

                        <div className="card border-0 shadow-sm rounded-4">

                            <div className="card-body text-center py-5">

                                <i className="bi bi-briefcase display-3 text-muted"></i>

                                <h4 className="fw-bold mt-3">

                                    {showExpired
                                        ? "No Expired Internships"
                                        : "No Available Internships"
                                    }

                                </h4>

                                <p className="text-muted mb-0">

                                    {showExpired
                                        ? "There are currently no expired internships to display."
                                        : "There are currently no active internship opportunities available."
                                    }

                                </p>

                            </div>

                        </div>

                    )}


                    {/* Internship Cards */}

                    <div className="row g-4">

                        {displayedInternships.map((internship) => (

                            <div
                                className="col-12 col-md-6 col-xl-4"
                                key={internship.internshipId}
                            >

                                <div className="card border-0 shadow-sm rounded-4 h-100">

                                    <div className="card-body p-4 d-flex flex-column">


                                        {/* Title and Status */}

                                        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">

                                            <div>

                                                <h5 className="fw-bold mb-1">

                                                    {internship.title}

                                                </h5>

                                                <p className="text-muted mb-0">

                                                    <i className="bi bi-building me-1"></i>

                                                    {internship.company}

                                                </p>

                                            </div>


                                            {showExpired ? (

                                                <span className="badge text-bg-secondary">

                                                    EXPIRED

                                                </span>

                                            ) : (

                                                <span className="badge text-bg-success">

                                                    ACTIVE

                                                </span>

                                            )}

                                        </div>


                                        {/* Description */}

                                        <p className="text-muted small">

                                            {internship.description}

                                        </p>


                                        <hr />


                                        {/* Details */}

                                        <div className="row g-3 small mb-4">


                                            {/* Location */}

                                            <div className="col-6">

                                                <div className="text-muted mb-1">

                                                    <i className="bi bi-geo-alt me-1"></i>

                                                    Location

                                                </div>

                                                <div className="fw-semibold">

                                                    {internship.location}

                                                </div>

                                            </div>


                                            {/* Mode */}

                                            <div className="col-6">

                                                <div className="text-muted mb-1">

                                                    <i className="bi bi-laptop me-1"></i>

                                                    Mode

                                                </div>

                                                <div className="fw-semibold">

                                                    {internship.mode}

                                                </div>

                                            </div>


                                            {/* Duration */}

                                            <div className="col-6">

                                                <div className="text-muted mb-1">

                                                    <i className="bi bi-clock me-1"></i>

                                                    Duration

                                                </div>

                                                <div className="fw-semibold">

                                                    {internship.duration}

                                                </div>

                                            </div>


                                            {/* Stipend */}

                                            <div className="col-6">

                                                <div className="text-muted mb-1">

                                                    <i className="bi bi-currency-rupee me-1"></i>

                                                    Stipend

                                                </div>

                                                <div className="fw-semibold">

                                                    ₹ {internship.stipend}

                                                </div>

                                            </div>


                                            {/* Skills */}

                                            <div className="col-12">

                                                <div className="text-muted mb-1">

                                                    <i className="bi bi-tools me-1"></i>

                                                    Skills Required

                                                </div>

                                                <div className="fw-semibold">

                                                    {internship.skillRequired}

                                                </div>

                                            </div>


                                            {/* Deadline */}

                                            <div className="col-12">

                                                <div className="text-muted mb-1">

                                                    <i className="bi bi-calendar-event me-1"></i>

                                                    Application Deadline

                                                </div>

                                                <div className="fw-semibold">

                                                    {new Date(
                                                        internship.applyDeadline
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric"
                                                        }
                                                    )}

                                                </div>

                                            </div>

                                        </div>


                                        {/* Apply Button */}

                                        {!showExpired && (

                                            <div className="mt-auto">

                                                <button
                                                    className="btn btn-primary w-100"
                                                    onClick={() =>
                                                        applyForInternship(
                                                            internship.internshipId
                                                        )
                                                    }
                                                >

                                                    <i className="bi bi-send-fill me-2"></i>

                                                    Apply Now

                                                </button>

                                            </div>

                                        )}

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

export default Internship;