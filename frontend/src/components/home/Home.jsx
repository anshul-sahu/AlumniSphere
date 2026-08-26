import "./Home.css";

function Home() {
    const features = [
        {
            icon: "🤝",
            title: "Connect with Alumni",
            description:
                "Build meaningful professional connections with experienced alumni from different industries."
        },
        {
            icon: "🎯",
            title: "Find a Mentor",
            description:
                "Get career guidance and mentorship from experienced professionals."
        },
        {
            icon: "💼",
            title: "Explore Opportunities",
            description:
                "Discover jobs, internships, referrals and career opportunities."
        },
        {
            icon: "📅",
            title: "Join Events",
            description:
                "Participate in workshops, webinars, alumni meets and networking events."
        },
        {
            icon: "🤖",
            title: "AI Resume Builder",
            description:
                "Create and improve your professional resume using AI-powered suggestions."
        },
        {
            icon: "🌐",
            title: "Grow Your Network",
            description:
                "Expand your professional network by connecting with students and alumni."
        }
    ];

    const alumni = [
        {
            name: "Rahul Sharma",
            role: "Software Engineer",
            company: "TCS",
            batch: "2022"
        },
        {
            name: "Priya Patel",
            role: "Data Analyst",
            company: "Infosys",
            batch: "2021"
        },
        {
            name: "Aman Verma",
            role: "Backend Developer",
            company: "Accenture",
            batch: "2020"
        }
    ];

    const opportunities = [
        {
            title: "Java Developer Intern",
            company: "Tech Solutions",
            location: "Remote",
            skills: "Java, Spring Boot"
        },
        {
            title: "Frontend Developer Intern",
            company: "CodeCraft",
            location: "Bangalore",
            skills: "React, JavaScript"
        },
        {
            title: "Software Engineer",
            company: "InnovateTech",
            location: "Hyderabad",
            skills: "Java, MySQL"
        }
    ];

    const events = [
        {
            title: "Alumni Career Guidance Session",
            date: "15 September 2026",
            mode: "Online"
        },
        {
            title: "Alumni Networking Meet",
            date: "25 September 2026",
            mode: "Offline"
        },
        {
            title: "Resume Building Workshop",
            date: "30 September 2026",
            mode: "Online"
        }
    ];

    return (
        <>
            {/* ================= HERO SECTION ================= */}

            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center min-vh-75">

                        <div className="col-md-6">
                            <h1 className="display-4 fw-bold">
                                Connect. Learn. Grow.
                            </h1>

                            <p className="lead mt-3">
                                AlumniSphere connects students and alumni to build
                                meaningful professional relationships, discover
                                opportunities, find mentors and grow together.
                            </p>

                            <div className="mt-4">
                                <button className="btn btn-primary btn-lg me-3">
                                    Join Our Community
                                </button>

                                <button className="btn btn-outline-primary btn-lg">
                                    Explore Alumni
                                </button>
                            </div>
                        </div>

                        <div className="col-md-6 text-center">
                            <img
                                src="/alumni_logo.png"
                                alt="AlumniSphere"
                                className="img-fluid hero-image"
                            />
                        </div>

                    </div>
                </div>
            </section>


            {/* ================= STATISTICS ================= */}

            <section className="py-5 bg-light">
                <div className="container">

                    <div className="row text-center">

                        <div className="col-md-3 col-6 mb-4">
                            <h2 className="fw-bold text-primary">500+</h2>
                            <p>Alumni</p>
                        </div>

                        <div className="col-md-3 col-6 mb-4">
                            <h2 className="fw-bold text-primary">1000+</h2>
                            <p>Students</p>
                        </div>

                        <div className="col-md-3 col-6 mb-4">
                            <h2 className="fw-bold text-primary">100+</h2>
                            <p>Opportunities</p>
                        </div>

                        <div className="col-md-3 col-6 mb-4">
                            <h2 className="fw-bold text-primary">50+</h2>
                            <p>Mentors</p>
                        </div>

                    </div>

                </div>
            </section>


            {/* ================= FEATURES ================= */}

            <section className="py-5">
                <div className="container">

                    <div className="text-center mb-5">
                        <h2 className="fw-bold">
                            Everything You Need to Grow
                        </h2>

                        <p className="text-muted">
                            Explore opportunities, connect with alumni and build
                            your professional future.
                        </p>
                    </div>

                    <div className="row">

                        {features.map((feature, index) => (
                            <div
                                className="col-md-4 mb-4"
                                key={index}
                            >
                                <div className="card h-100 shadow-sm border-0 feature-card">

                                    <div className="card-body text-center p-4">

                                        <div className="feature-icon">
                                            {feature.icon}
                                        </div>

                                        <h4 className="mt-3">
                                            {feature.title}
                                        </h4>

                                        <p className="text-muted">
                                            {feature.description}
                                        </p>

                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            </section>


            {/* ================= HOW IT WORKS ================= */}

            <section className="py-5 bg-light">
                <div className="container">

                    <div className="text-center mb-5">
                        <h2 className="fw-bold">
                            How AlumniSphere Works
                        </h2>
                    </div>

                    <div className="row text-center">

                        <div className="col-md-4 mb-4">
                            <div className="step-number">
                                1
                            </div>

                            <h4 className="mt-3">
                                Join the Community
                            </h4>

                            <p className="text-muted">
                                Create your profile and become part of the
                                AlumniSphere network.
                            </p>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="step-number">
                                2
                            </div>

                            <h4 className="mt-3">
                                Connect & Discover
                            </h4>

                            <p className="text-muted">
                                Find alumni, mentors, opportunities and events.
                            </p>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="step-number">
                                3
                            </div>

                            <h4 className="mt-3">
                                Learn & Grow
                            </h4>

                            <p className="text-muted">
                                Build your skills, network and career with the
                                help of the alumni community.
                            </p>
                        </div>

                    </div>

                </div>
            </section>


            {/* ================= FEATURED ALUMNI ================= */}

            <section className="py-5">
                <div className="container">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>
                            <h2 className="fw-bold">
                                Meet Our Alumni
                            </h2>

                            <p className="text-muted">
                                Connect with professionals from different industries.
                            </p>
                        </div>

                        <button className="btn btn-outline-primary">
                            View All
                        </button>

                    </div>

                    <div className="row">

                        {alumni.map((person, index) => (
                            <div
                                className="col-md-4 mb-4"
                                key={index}
                            >
                                <div className="card text-center shadow-sm h-100">

                                    <div className="card-body p-4">

                                        <div className="profile-placeholder">
                                            👤
                                        </div>

                                        <h4 className="mt-3">
                                            {person.name}
                                        </h4>

                                        <p className="mb-1">
                                            {person.role}
                                        </p>

                                        <p className="text-muted">
                                            {person.company}
                                        </p>

                                        <span className="badge text-bg-light">
                                            Batch {person.batch}
                                        </span>

                                        <br />

                                        <button className="btn btn-primary mt-3">
                                            View Profile
                                        </button>

                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            </section>


            {/* ================= OPPORTUNITIES ================= */}

            <section className="py-5 bg-light">

                <div className="container">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">
                            Latest Opportunities
                        </h2>

                        <p className="text-muted">
                            Discover jobs and internships shared by our alumni.
                        </p>

                    </div>

                    <div className="row">

                        {opportunities.map((opportunity, index) => (

                            <div
                                className="col-md-4 mb-4"
                                key={index}
                            >

                                <div className="card h-100 shadow-sm">

                                    <div className="card-body p-4">

                                        <h4>
                                            {opportunity.title}
                                        </h4>

                                        <p className="mb-2">
                                            🏢 {opportunity.company}
                                        </p>

                                        <p className="mb-2">
                                            📍 {opportunity.location}
                                        </p>

                                        <p className="text-muted">
                                            {opportunity.skills}
                                        </p>

                                        <button className="btn btn-outline-primary">
                                            View Opportunity
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* ================= EVENTS ================= */}

            <section className="py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">
                            Upcoming Events
                        </h2>

                        <p className="text-muted">
                            Learn, connect and grow with the AlumniSphere community.
                        </p>

                    </div>

                    <div className="row">

                        {events.map((event, index) => (

                            <div
                                className="col-md-4 mb-4"
                                key={index}
                            >

                                <div className="card h-100 shadow-sm">

                                    <div className="card-body p-4">

                                        <div className="fs-1">
                                            📅
                                        </div>

                                        <h4 className="mt-3">
                                            {event.title}
                                        </h4>

                                        <p>
                                            {event.date}
                                        </p>

                                        <p className="text-muted">
                                            {event.mode}
                                        </p>

                                        <button className="btn btn-primary">
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* ================= AI RESUME BUILDER ================= */}

            <section className="ai-section py-5">

                <div className="container">

                    <div className="row align-items-center">

                        <div className="col-md-7">

                            <h2 className="fw-bold">
                                🤖 Build a Resume That Gets Noticed
                            </h2>

                            <p className="lead mt-3">
                                Create a professional resume with AI-powered
                                suggestions and improve your skills, projects
                                and experience descriptions.
                            </p>

                            <ul className="list-unstyled">

                                <li>✓ AI-powered suggestions</li>
                                <li>✓ Professional resume templates</li>
                                <li>✓ Improve project descriptions</li>
                                <li>✓ ATS-friendly resume guidance</li>

                            </ul>

                            <button className="btn btn-primary btn-lg mt-3">
                                Try AI Resume Builder
                            </button>

                        </div>

                        <div className="col-md-5 text-center">

                            <div className="resume-preview shadow">

                                <h4>My Resume</h4>

                                <hr />

                                <p className="text-muted">
                                    Professional Summary
                                </p>

                                <div className="resume-line"></div>
                                <div className="resume-line"></div>
                                <div className="resume-line short"></div>

                                <h6 className="mt-4">
                                    Skills
                                </h6>

                                <div className="resume-line"></div>
                                <div className="resume-line short"></div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CALL TO ACTION ================= */}

            <section className="cta-section py-5 text-center">

                <div className="container">

                    <h2 className="fw-bold">
                        Your Alumni Network Is Waiting
                    </h2>

                    <p className="lead mt-3">
                        Connect with alumni, discover opportunities, find mentors
                        and take the next step in your career journey.
                    </p>

                    <button className="btn btn-light btn-lg mt-3">
                        Join AlumniSphere
                    </button>

                </div>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="bg-dark text-white py-4">

                <div className="container">

                    <div className="row">

                        <div className="col-md-6">

                            <h4>
                                AlumniSphere
                            </h4>

                            <p className="text-secondary">
                                Connecting generations. Building futures.
                            </p>

                        </div>

                        <div className="col-md-6 text-md-end">

                            <p>
                                Home &nbsp; | &nbsp;
                                Alumni &nbsp; | &nbsp;
                                Opportunities &nbsp; | &nbsp;
                                Events
                            </p>

                            <p className="text-secondary">
                                © 2026 AlumniSphere. All Rights Reserved.
                            </p>

                        </div>

                    </div>

                </div>

            </footer>
        </>
    );
}

export default Home;