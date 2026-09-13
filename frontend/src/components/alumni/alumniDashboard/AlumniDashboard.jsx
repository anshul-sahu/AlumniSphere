import { useSelector } from "react-redux";
import Sidebar from "../../sidebar/Sidebar";
import { alumniSidebarItems } from "../../sidebar/sidebarData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AlumniDashboard() {

    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(user == null)
            navigate("/signIn")
    })

    return (
        <div className="d-flex min-vh-100 bg-light">

            <Sidebar items={alumniSidebarItems} />

            <main className="flex-grow-1 p-3 p-md-4">

                <div className="container-fluid p-0">

                    {/* Welcome Section */}
                    <div className="card border-0 shadow-sm rounded-4 mb-4">
                        <div className="card-body p-4 p-md-5">

                            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">

                                <div>
                                    <h2 className="fw-bold mb-2">
                                        Welcome {user.object.name}
                                    </h2>

                                    <p className="text-muted mb-0">
                                        Connect with your alumni community, share opportunities,
                                        and help students grow.
                                    </p>
                                </div>

                                <div className="d-none d-md-block">
                                    <i className="bi bi-mortarboard-fill display-3 text-primary opacity-75"></i>
                                </div>

                            </div>

                        </div>
                    </div>


                    {/* Available Features */}
                    <div className="mb-4">
                        <h4 className="fw-bold mb-1">
                            Explore Features
                        </h4>

                        <p className="text-muted">
                            Everything you can do from your alumni account.
                        </p>
                    </div>


                    <div className="row g-4">

                        {/* Profile */}
                        <div className="col-12 col-md-6 col-xl-4">
                            <div className="card border-0 shadow-sm rounded-4 h-100">
                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-primary-subtle text-primary rounded-3 p-3 me-3">
                                            <i className="bi bi-person-fill fs-4"></i>
                                        </div>

                                        <h5 className="fw-bold mb-0">
                                            My Profile
                                        </h5>
                                    </div>

                                    <p className="text-muted mb-0">
                                        Manage your professional and personal information.
                                    </p>

                                </div>
                            </div>
                        </div>


                        {/* Mentorship */}
                        <div className="col-12 col-md-6 col-xl-4">
                            <div className="card border-0 shadow-sm rounded-4 h-100">
                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-success-subtle text-success rounded-3 p-3 me-3">
                                            <i className="bi bi-people-fill fs-4"></i>
                                        </div>

                                        <h5 className="fw-bold mb-0">
                                            Mentorship
                                        </h5>
                                    </div>

                                    <p className="text-muted mb-0">
                                        Connect with students and support them through mentorship.
                                    </p>

                                </div>
                            </div>
                        </div>


                        {/* Job Opportunities */}
                        <div className="col-12 col-md-6 col-xl-4">
                            <div className="card border-0 shadow-sm rounded-4 h-100">
                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-warning-subtle text-warning rounded-3 p-3 me-3">
                                            <i className="bi bi-briefcase-fill fs-4"></i>
                                        </div>

                                        <h5 className="fw-bold mb-0">
                                            Job Opportunities
                                        </h5>
                                    </div>

                                    <p className="text-muted mb-0">
                                        Share job opportunities and help students build their careers.
                                    </p>

                                </div>
                            </div>
                        </div>


                        {/* Alumni Network */}
                        <div className="col-12 col-md-6 col-xl-4">
                            <div className="card border-0 shadow-sm rounded-4 h-100">
                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-info-subtle text-info rounded-3 p-3 me-3">
                                            <i className="bi bi-diagram-3-fill fs-4"></i>
                                        </div>

                                        <h5 className="fw-bold mb-0">
                                            Alumni Network
                                        </h5>
                                    </div>

                                    <p className="text-muted mb-0">
                                        Explore and connect with fellow alumni.
                                    </p>

                                </div>
                            </div>
                        </div>


                        {/* Events */}
                        <div className="col-12 col-md-6 col-xl-4">
                            <div className="card border-0 shadow-sm rounded-4 h-100">
                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-danger-subtle text-danger rounded-3 p-3 me-3">
                                            <i className="bi bi-calendar-event-fill fs-4"></i>
                                        </div>

                                        <h5 className="fw-bold mb-0">
                                            Events
                                        </h5>
                                    </div>

                                    <p className="text-muted mb-0">
                                        Stay connected with upcoming alumni and college events.
                                    </p>

                                </div>
                            </div>
                        </div>


                        {/* Community */}
                        <div className="col-12 col-md-6 col-xl-4">
                            <div className="card border-0 shadow-sm rounded-4 h-100">
                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-secondary-subtle text-secondary rounded-3 p-3 me-3">
                                            <i className="bi bi-chat-square-text-fill fs-4"></i>
                                        </div>

                                        <h5 className="fw-bold mb-0">
                                            Community
                                        </h5>
                                    </div>

                                    <p className="text-muted mb-0">
                                        Engage with the alumni and student community.
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

export default AlumniDashboard;