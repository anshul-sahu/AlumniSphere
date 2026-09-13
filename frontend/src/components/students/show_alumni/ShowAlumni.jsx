import { useEffect, useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import { studentSidebarItems } from "../../sidebar/sidebarData";
import axios from "axios";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

function ShowAlumni() {

    const token = localStorage.getItem("token");
    const [alumnis, setAlumnis] = useState([]);
    const navigate = useNavigate();


    /* Fetch Alumni */

    useEffect(() => {

        axios.get(
            `${api}/collect_all_alumni`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((object) => {

            console.log(object.data);

            /*
                If your backend returns the array directly,
                this is correct.
            */
            setAlumnis(object.data || []);

        })
        .catch((err) => {

            console.log(err);

            if (err.response?.status === 401) {
                navigate("/signIn");
            }

        });

    }, [token, navigate]);


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
                            <i className="bi bi-people-fill text-primary me-2"></i>
                            Alumni Network
                        </h2>

                        <p className="text-muted mb-0">
                            Explore and connect with alumni from different
                            companies and locations.
                        </p>

                    </div>


                    {/* Empty State */}
                    {alumnis.length === 0 && (

                        <div className="card border-0 shadow-sm rounded-4">

                            <div className="card-body text-center py-5">

                                <i className="bi bi-people display-3 text-muted"></i>

                                <h4 className="fw-bold mt-3">
                                    No Alumni Available
                                </h4>

                                <p className="text-muted mb-0">
                                    Alumni information will appear here when available.
                                </p>

                            </div>

                        </div>

                    )}


                    {/* Alumni Cards */}
                    <div className="row g-4">

                        {alumnis.map((alumni) => (

                            <div
                                className="col-12 col-md-6 col-xl-4"
                                key={alumni.user.userId}
                            >

                                <div className="card border-0 shadow-sm rounded-4 h-100">

                                    <div className="card-body p-4 d-flex flex-column">


                                        {/* Alumni Header */}
                                        <div className="d-flex align-items-start justify-content-between gap-3 mb-4">

                                            <div className="d-flex align-items-center gap-3">

                                                {/* Profile Icon */}
                                                <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                                    style={{
                                                        width: "55px",
                                                        height: "55px"
                                                    }}
                                                >
                                                    <i className="bi bi-person-fill fs-3"></i>
                                                </div>


                                                <div>

                                                    <h5 className="fw-bold mb-1">
                                                        {alumni.user.name}
                                                    </h5>

                                                    <small className="text-muted">
                                                        Alumni
                                                    </small>

                                                </div>

                                            </div>


                                            {/* Mentorship Status */}
                                            {alumni.availableForMentornship ? (

                                                <span className="badge text-bg-success">
                                                    <i className="bi bi-person-check me-1"></i>
                                                    Mentor Available
                                                </span>

                                            ) : (

                                                <span className="badge text-bg-secondary">
                                                    Not Available
                                                </span>

                                            )}

                                        </div>


                                        {/* Professional Information */}
                                        <div className="border-top pt-3">

                                            <div className="mb-3">

                                                <div className="text-muted small mb-1">
                                                    <i className="bi bi-building me-2"></i>
                                                    Current Company
                                                </div>

                                                <div className="fw-semibold">
                                                    {alumni.currentCompany || "Not specified"}
                                                </div>

                                            </div>


                                            <div className="mb-3">

                                                <div className="text-muted small mb-1">
                                                    <i className="bi bi-mortarboard me-2"></i>
                                                    Graduation Year
                                                </div>

                                                <div className="fw-semibold">
                                                    {alumni.graduationYear || "Not specified"}
                                                </div>

                                            </div>


                                            <div className="mb-3">

                                                <div className="text-muted small mb-1">
                                                    <i className="bi bi-geo-alt me-2"></i>
                                                    Location
                                                </div>

                                                <div className="fw-semibold">
                                                    {alumni.location || "Not specified"}
                                                </div>

                                            </div>


                                            <div className="mb-3">

                                                <div className="text-muted small mb-1">
                                                    <i className="bi bi-envelope me-2"></i>
                                                    Email
                                                </div>

                                                <div className="text-break">
                                                    {alumni.user.email}
                                                </div>

                                            </div>


                                            <div className="mb-3">

                                                <div className="text-muted small mb-1">
                                                    <i className="bi bi-telephone me-2"></i>
                                                    Contact
                                                </div>

                                                <div>
                                                    {alumni.user.phone || "Not specified"}
                                                </div>

                                            </div>

                                        </div>


                                        {/* LinkedIn */}
                                        {alumni.linkedInUrl && (

                                            <div className="mt-auto pt-3 border-top">

                                                <a
                                                    href={alumni.linkedInUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-outline-primary w-100"
                                                >

                                                    <i className="bi bi-linkedin me-2"></i>

                                                    View LinkedIn Profile

                                                </a>

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

export default ShowAlumni;