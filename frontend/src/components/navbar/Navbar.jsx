import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../redux/authSlice";

function Navbar() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    let dispatch = useDispatch();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2">
            <div className="container">

                {/* Logo */}
                <Link className="navbar-brand" to="/">
                    <img
                        src="/alumni_logo.png"
                        alt="AlumniSphere Logo"
                        height="70"
                    />
                </Link>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Content */}
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    {/* Navigation Links */}
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                        <li className="nav-item mx-lg-2">
                            <NavLink
                                className="nav-link  fw-semibold"
                                to="/"
                            >
                                <i className="bi bi-house-fill me-1"></i>
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item mx-lg-2">
                            <NavLink
                                className="nav-link"
                                to="/about"
                            >
                                <i className="bi bi-people-fill me-1"></i>
                                About Us
                            </NavLink>
                        </li>

                        <li className="nav-item mx-lg-2">
                            <NavLink
                                className="nav-link"
                                to="/contact"
                            >
                                <i className="bi bi-telephone-fill me-1"></i>
                                Contact
                            </NavLink>
                        </li>

                    </ul>

                    {/* Authentication Buttons */}
                    <div className="d-flex gap-2">
                        {
                            isAuthenticated && <Link
                                to="/signIn" onClick={()=>dispatch(logout())}
                                className="btn btn-outline-primary" 
                            >
                                Logout
                            </Link>
                        }

                        {
                            !isAuthenticated &&
                            <>
                                <Link
                                    to="/signUp"
                                    className="btn btn-outline-primary"
                                >
                                    <i class="bi bi-box-arrow-in-left"></i> Sign Up
                                </Link>

                                <Link
                                    to="/signIn"
                                    className="btn btn-outline-primary"
                                >
                                   <i class="bi bi-box-arrow-in-left"></i> Sign In
                                </Link>
                            </>
                        }
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;