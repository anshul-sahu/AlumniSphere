import { useSelector } from "react-redux";
import Sidebar from "../../sidebar/Sidebar";
import { adminSidebarItems } from "../../sidebar/sidebarData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminProfile() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    // Your current Redux structure appears to be user.object
    const admin = user?.object;

    useEffect(()=>{
        if(user == null){
            navigate("/signIn")
        }
    })

    return (
        <div className="d-flex min-vh-100 bg-light">

            {/* Sidebar */}
            <Sidebar items={adminSidebarItems} />

            {/* Main Content */}
            <main className="flex-grow-1 p-3 p-md-4">

                <div className="container-fluid">

                    {/* Page Heading */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                        <div>
                            <h2 className="fw-bold mb-1">
                                <i className="bi bi-person-circle text-primary me-2"></i>
                                My Profile
                            </h2>

                            <p className="text-muted mb-0">
                                View and manage your account information
                            </p>
                        </div>

                        <span className="badge bg-primary-subtle text-primary px-3 py-2 mt-3 mt-md-0">
                            <i className="bi bi-shield-check me-1"></i>
                            Administrator
                        </span>
                    </div>

                    <div className="row g-4">

                        {/* Profile Card */}
                        <div className="col-12 col-lg-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body text-center p-4 p-md-5">

                                    {/* Profile Icon */}
                                    <div
                                        className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center mb-3 shadow"
                                        style={{
                                            width: "100px",
                                            height: "100px"
                                        }}
                                    >
                                        <i className="bi bi-person-fill text-white display-4"></i>
                                    </div>

                                    <h4 className="fw-bold mb-1">
                                        {admin?.name || "Admin User"}
                                    </h4>

                                    <p className="text-muted mb-3">
                                        {admin?.email || "No email available"}
                                    </p>

                                    <div className="border-top pt-3 mt-3">

                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-muted">
                                                Account Status
                                            </span>

                                            <span className="badge bg-success">
                                                <i className="bi bi-check-circle me-1"></i>
                                                Active
                                            </span>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <span className="text-muted">
                                                Role
                                            </span>

                                            <span className="fw-semibold">
                                                Admin
                                            </span>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Personal Information */}
                        <div className="col-12 col-lg-8">

                            <div className="card border-0 shadow-sm rounded-4">

                                {/* Card Header */}
                                <div className="card-header bg-white border-0 pt-4 px-4 px-md-5">

                                    <h5 className="fw-bold mb-1">
                                        <i className="bi bi-person-vcard text-primary me-2"></i>
                                        Personal Information
                                    </h5>

                                    <p className="text-muted small mb-0">
                                        Your account details
                                    </p>

                                </div>


                                {/* Card Body */}
                                <div className="card-body p-4 p-md-5">

                                    <div className="row g-4">

                                        {/* Name */}
                                        <div className="col-12 col-md-6">

                                            <label className="text-muted small mb-1">
                                                <i className="bi bi-person me-1"></i>
                                                Full Name
                                            </label>

                                            <div className="fw-semibold fs-6">
                                                {admin?.name || "Not available"}
                                            </div>

                                        </div>


                                        {/* Email */}
                                        <div className="col-12 col-md-6">

                                            <label className="text-muted small mb-1">
                                                <i className="bi bi-envelope me-1"></i>
                                                Email Address
                                            </label>

                                            <div className="fw-semibold fs-6 text-break">
                                                {admin?.email || "Not available"}
                                            </div>

                                        </div>


                                        {/* Phone */}
                                        <div className="col-12 col-md-6">

                                            <label className="text-muted small mb-1">
                                                <i className="bi bi-telephone me-1"></i>
                                                Phone Number
                                            </label>

                                            <div className="fw-semibold fs-6">
                                                {admin?.phone || "Not available"}
                                            </div>

                                        </div>


                                        {/* Account Created */}
                                        <div className="col-12 col-md-6">

                                            <label className="text-muted small mb-1">
                                                <i className="bi bi-calendar-check me-1"></i>
                                                Account Created
                                            </label>

                                            <div className="fw-semibold fs-6">
                                                {admin?.createdAt
                                                    ? new Date(
                                                        admin.createdAt
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric"
                                                        }
                                                    )
                                                    : "Not available"}
                                            </div>

                                        </div>

                                    </div>

                                    {/* Divider */}
                                    <hr className="my-4" />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default AdminProfile;