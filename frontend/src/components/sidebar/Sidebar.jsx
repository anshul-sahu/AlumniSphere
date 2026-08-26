import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ items, title = "Dashboard" }) {

    return (

        <aside className="sidebar bg-white border-end shadow-sm">

            {/* Sidebar Header */}

            <div className="sidebar-header p-3 border-bottom">

                <h5 className="sidebar-title mb-0 text-primary fw-bold">
                    {title}
                </h5>

                <i className="bi bi-grid-fill sidebar-logo"></i>

            </div>


            {/* Sidebar Links */}

            <div className="nav flex-column p-3 gap-2 sidebar-nav">

                {items.map((item) => (

                    <NavLink
                        key={item.path}
                        to={item.path}
                        title={item.title}
                        className={({ isActive }) =>
                            `
                            nav-link
                            sidebar-link
                            rounded
                            px-3
                            py-2
                            fw-medium
                            ${
                                isActive
                                    ? "bg-primary text-white"
                                    : "text-dark"
                            }
                            `
                        }
                    >

                        <i
                            className={`bi ${item.icon} sidebar-icon`}
                        ></i>

                        <span className="sidebar-text">
                            {item.title}
                        </span>

                    </NavLink>

                ))}

            </div>


            {/* Logout */}

            <div className="sidebar-logout p-3 border-top mt-auto">

                <button className="btn btn-outline-danger w-100 logout-btn">

                    <i className="bi bi-box-arrow-right sidebar-icon"></i>

                    <span className="sidebar-text">
                        Logout
                    </span>

                </button>

            </div>

        </aside>
    );
}

export default Sidebar;