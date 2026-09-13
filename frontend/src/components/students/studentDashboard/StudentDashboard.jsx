import Sidebar from "../../sidebar/Sidebar";
import { studentSidebarItems } from "../../sidebar/sidebarData";

function StudentDashboard() {
    return (
        <div className="d-flex min-vh-100 bg-light">

            {/* Sidebar */}
            <Sidebar items={studentSidebarItems} />

            {/* Main Content */}
            <main className="flex-grow-1 p-3 p-md-4">

                <div className="container-fluid p-0">

                    {/* Welcome Section */}
                    <div className="card border-0 shadow-sm rounded-4 mb-4">

                        <div className="card-body p-4 p-md-5">

                            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-4">

                                <div>
                                    <h2 className="fw-bold mb-2">
                                        Welcome to AlumniSphere
                                    </h2>

                                    <p className="text-muted mb-0">
                                        Explore opportunities, connect with alumni,
                                        and take the next step in your career.
                                    </p>
                                </div>

                                <div className="d-none d-md-block">
                                    <i className="bi bi-mortarboard-fill display-3 text-primary opacity-75"></i>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Features Heading */}
                    <div className="mb-4">

                        <h4 className="fw-bold mb-1">
                            Explore Features
                        </h4>

                        <p className="text-muted mb-0">
                            Access opportunities and connect with the alumni community.
                        </p>

                    </div>


                    {/* Features */}
                    <div className="row g-4">

                        {/* My Profile */}
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
                                        View and manage your personal and academic information.
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Internships */}
                        <div className="col-12 col-md-6 col-xl-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">

                                        <div className="bg-success-subtle text-success rounded-3 p-3 me-3">
                                            <i className="bi bi-briefcase-fill fs-4"></i>
                                        </div>

                                        <h5 className="fw-bold mb-0">
                                            Internships
                                        </h5>

                                    </div>

                                    <p className="text-muted mb-0">
                                        Discover internship opportunities shared by alumni.
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Jobs */}
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
                                        Explore job opportunities shared by the alumni network.
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Find Mentor */}
                        <div className="col-12 col-md-6 col-xl-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">

                                        <div className="bg-info-subtle text-info rounded-3 p-3 me-3">
                                            <i className="bi bi-person-heart fs-4"></i>
                                        </div>

                                        <h5 className="fw-bold mb-0">
                                            Find a Mentor
                                        </h5>

                                    </div>

                                    <p className="text-muted mb-0">
                                        Connect with experienced alumni for career guidance.
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Alumni Network */}
                        <div className="col-12 col-md-6 col-xl-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">

                                        <div className="bg-danger-subtle text-danger rounded-3 p-3 me-3">
                                            <i className="bi bi-people-fill fs-4"></i>
                                        </div>

                                        <h5 className="fw-bold mb-0">
                                            Alumni Network
                                        </h5>

                                    </div>

                                    <p className="text-muted mb-0">
                                        Explore and connect with alumni from different fields.
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Events */}
                        <div className="col-12 col-md-6 col-xl-4">

                            <div className="card border-0 shadow-sm rounded-4 h-100">

                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">

                                        <div className="bg-secondary-subtle text-secondary rounded-3 p-3 me-3">
                                            <i className="bi bi-calendar-event-fill fs-4"></i>
                                        </div>

                                        <h5 className="fw-bold mb-0">
                                            Events
                                        </h5>

                                    </div>

                                    <p className="text-muted mb-0">
                                        Stay updated with upcoming college and alumni events.
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

export default StudentDashboard;