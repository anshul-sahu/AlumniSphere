import { useSelector } from "react-redux";
import Sidebar from "../../sidebar/Sidebar";
import { adminSidebarItems } from "../../sidebar/sidebarData.js";
function AdminDashboard() {
    
    const {user} = useSelector((state)=>state.auth);
    console.log(user)
    return (
        <div className="d-flex">

            <Sidebar items={adminSidebarItems} />

            <main className="flex-grow-1 p-4">


                <div className="container-fluid p-0">

                    {/* Welcome Section */}

                    <div className="bg-white shadow-sm rounded-4 p-4 p-md-5 mb-4">

                        <div className="row align-items-center g-4">

                            <div className="col-12 col-md-8">

                                <span className="badge bg-primary mb-3">
                                    Admin Dashboard
                                </span>

                                <h1 className="fw-bold mb-3">
                                    Welcome to {user.object.name}
                                </h1>

                                <p className="text-muted fs-6 fs-md-5 mb-0">
                                    Manage and monitor the AlumniSphere platform from
                                    one central place. Use the available features to
                                    manage activities and support the alumni community.
                                </p>

                            </div>


                            <div className="col-12 col-md-4 text-center">

                                <i className="bi bi-shield-check text-primary display-1"></i>

                            </div>

                        </div>

                    </div>


                    {/* Features Heading */}

                    <div className="mb-4">

                        <h3 className="fw-bold">
                            Platform Management
                        </h3>

                        <p className="text-muted mb-0">
                            Access the available features to manage the AlumniSphere
                            platform.
                        </p>

                    </div>


                    {/* Feature Cards */}

                    <div className="row g-3 g-md-4">

                        <div className="col-12 col-sm-6 col-xl-4">

                            <div className="card h-100 border-0 shadow-sm rounded-4">

                                <div className="card-body p-4">

                                    <i className="bi bi-person-circle fs-2 text-primary"></i>

                                    <h5 className="fw-bold mt-3">
                                        Profile Management
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Manage your administrator profile and account
                                        information.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-12 col-sm-6 col-xl-4">

                            <div className="card h-100 border-0 shadow-sm rounded-4">

                                <div className="card-body p-4">

                                    <i className="bi bi-briefcase fs-2 text-primary"></i>

                                    <h5 className="fw-bold mt-3">
                                        Job Management
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Manage career opportunities and job-related
                                        information for the community.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-12 col-sm-6 col-xl-4">

                            <div className="card h-100 border-0 shadow-sm rounded-4">

                                <div className="card-body p-4">

                                    <i className="bi bi-people fs-2 text-primary"></i>

                                    <h5 className="fw-bold mt-3">
                                        Mentorship
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Support meaningful connections between alumni
                                        and students through mentorship.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-12 col-sm-6 col-xl-4">

                            <div className="card h-100 border-0 shadow-sm rounded-4">

                                <div className="card-body p-4">

                                    <i className="bi bi-calendar-event fs-2 text-primary"></i>

                                    <h5 className="fw-bold mt-3">
                                        Events
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Organize and manage events and activities for
                                        the AlumniSphere community.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-12 col-sm-6 col-xl-4">

                            <div className="card h-100 border-0 shadow-sm rounded-4">

                                <div className="card-body p-4">

                                    <i className="bi bi-diagram-3 fs-2 text-primary"></i>

                                    <h5 className="fw-bold mt-3">
                                        Community Management
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Maintain connections between students, alumni,
                                        and the institution.
                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="col-12 col-sm-6 col-xl-4">

                            <div className="card h-100 border-0 shadow-sm rounded-4">

                                <div className="card-body p-4">

                                    <i className="bi bi-shield-lock fs-2 text-primary"></i>

                                    <h5 className="fw-bold mt-3">
                                        Secure Administration
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Access administrative features through a
                                        centralized role-based platform.
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

export default AdminDashboard;