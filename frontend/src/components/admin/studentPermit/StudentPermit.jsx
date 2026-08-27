import { useEffect, useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import { adminSidebarItems } from "../../sidebar/sidebarData";
import { useNavigate } from "react-router-dom";
import { collectStudent, approveStudent } from "./studentPermit";

function StudentPermit(){

    const token = localStorage.getItem("token");
    const [student, setStudent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [approvingId, setApprovingId] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        collectStudent(setLoading, setStudent, token, navigate);
    },[]);

    return (
        <div className="d-flex min-vh-100 bg-light">

            {/* Sidebar */}
            <Sidebar items={adminSidebarItems} />

            {/* Main Content */}
             <main className="flex-grow-1 p-3 p-md-4">

                <div className="container-fluid p-0">

                    {/* ================= Header ================= */}

                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-4">

                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                                <div>
                                    <h3 className="fw-bold mb-1">
                                        Student Approval
                                    </h3>

                                    <p className="text-secondary mb-0">
                                        Review and manage student registration requests.
                                    </p>
                                </div>

                                <div className="text-md-end">

                                    <span className="badge text-bg-primary fs-6 px-3 py-2">
                                        <i className="bi bi-people-fill me-2"></i>
                                        {student.length} Student
                                    </span>

                                </div>

                            </div>

                        </div>
                    </div>


                    {/* ================= Loading ================= */}

                    {loading && (
                        <div className="d-flex justify-content-center align-items-center py-5">

                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>

                        </div>
                    )}


                    {/* ================= Empty State ================= */}

                    {!loading && student.length === 0 && (

                        <div className="card border-0 shadow-sm">

                            <div className="card-body text-center py-5">

                                <i className="bi bi-people display-3 text-secondary"></i>

                                <h4 className="mt-3">
                                    No Student Found
                                </h4>

                                <p className="text-secondary mb-0">
                                    There are currently no student records available.
                                </p>

                            </div>

                        </div>

                    )}


                    {/* ================= Alumni Cards ================= */}

                    {!loading && student.length > 0 && (

                        <div className="row g-4">

                            {student.map((data) => (

                                <div
                                    className="col-12 col-lg-6"
                                    key={data.user.userId}
                                >

                                    <div className="card border-0 shadow-sm h-100">

                                        <div className="card-body p-4">

                                            {/* User Header */}

                                            <div className="d-flex justify-content-between align-items-start mb-4">

                                                <div className="d-flex align-items-center gap-3">

                                                    {/* Avatar */}

                                                    <div
                                                        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center fw-bold fs-4"
                                                        style={{
                                                            width: "55px",
                                                            height: "55px",
                                                            minWidth: "55px",
                                                        }}
                                                    >
                                                        {data.user.name
                                                            ?.charAt(0)
                                                            .toUpperCase()}
                                                    </div>


                                                    {/* Name */}

                                                    <div>

                                                        <h5 className="fw-bold mb-1">
                                                            {data.user.name}
                                                        </h5>

                                                        <span className="text-secondary small">

                                                            <i className="bi bi-envelope me-2"></i>

                                                            {data.user.email}

                                                        </span>

                                                    </div>

                                                </div>


                                                {/* Status */}

                                                <span
                                                    className={`badge px-3 py-2 ${
                                                        data.user.status ===
                                                        "PENDING"
                                                            ? "text-bg-warning"
                                                            : "text-bg-success"
                                                    }`}
                                                >

                                                    {data.user.status}

                                                </span>

                                            </div>


                                            <hr />


                                            {/* Alumni Details */}

                                            <div className="row g-3 mb-4">

                                                <div className="col-12 col-sm-6">

                                                    <div className="text-secondary small mb-1">

                                                        <i className="bi bi-telephone me-2"></i>
                                                        Phone

                                                    </div>

                                                    <div className="fw-semibold">

                                                        {data.user.phone}

                                                    </div>

                                                </div>


                                                <div className="col-12 col-sm-6">

                                                    <div className="text-secondary small mb-1">

                                                        <i className="bi bi-geo-alt me-2"></i>
                                                        Enrollment No

                                                    </div>

                                                    <div className="fw-semibold">

                                                        {data.enrollmentNo || "-"}

                                                    </div>

                                                </div>


                                                <div className="col-12 col-sm-6">

                                                    <div className="text-secondary small mb-1">

                                                        <i className="bi bi-building me-2"></i>
                                                        Skill

                                                    </div>

                                                    <div className="fw-semibold">

                                                        {data.skill || "-"}

                                                    </div>

                                                </div>


                                                <div className="col-12 col-sm-6">

                                                    <div className="text-secondary small mb-1">

                                                        <i className="bi bi-briefcase me-2"></i>
                                                        About them

                                                    </div>

                                                    <div className="fw-semibold">

                                                        {data.aboutUs || "-"}

                                                    </div>

                                                </div>


                                                <div className="col-12 col-sm-6">

                                                    <div className="text-secondary small mb-1">

                                                        <i className="bi bi-mortarboard me-2"></i>
                                                        Department

                                                    </div>

                                                    <div className="fw-semibold">

                                                        {data.departmentName || "-"}

                                                    </div>

                                                </div>


                                                <div className="col-12 col-sm-6">

                                                    <div className="text-secondary small mb-1">

                                                        <i className="bi bi-calendar-event me-2"></i>
                                                        Admission Year

                                                    </div>

                                                    <div className="fw-semibold">

                                                        {data.yearOfAdmission || "-"}

                                                    </div>

                                                </div>

                                            </div>


                                            {/* Footer */}

                                            <div className="border-top pt-3">

                                                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">

                                                  


                                                    {/* Approve Button */}

                                                    {data.user.status ===
                                                    "PENDING" ? (

                                                        <button
                                                            className="btn btn-success px-4"
                                                            onClick={() =>
                                                                approveStudent(
                                                                    data.user
                                                                        .userId,setApprovingId,setStudent, token, navigate
                                                                )
                                                            }
                                                            disabled={
                                                                approvingId ===
                                                                data.user.userId
                                                            }
                                                        >

                                                            {approvingId ===
                                                            data.user.userId ? (

                                                                <>
                                                                    <span className="spinner-border spinner-border-sm me-2"></span>

                                                                    Approving...
                                                                </>

                                                            ) : (

                                                                <>
                                                                    <i className="bi bi-check-circle me-2"></i>

                                                                    Approve
                                                                </>

                                                            )}

                                                        </button>

                                                    ) : (

                                                        <span className="text-success fw-semibold">

                                                            <i className="bi bi-check-circle-fill me-2"></i>

                                                            Approved

                                                        </span>

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

            </main>
        </div>

    )
};

export default StudentPermit;