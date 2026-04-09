import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Home", "About", "Events", "Success Stories"];
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src="../../../src/assets/alumni_logo.png"
              alt="Alumni Connect Logo"
              className="h-12 w-auto shrink-0 sm:h-14"
            />
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                AlumniSphere
              </h1>
              <p className="hidden text-xs text-slate-500 sm:block">Connect. Mentor. Grow.</p>
            </div>
          </div>

          <ul className="hidden items-center gap-2 md:flex">
            
              <li>
                <Link to="/"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link to="/About"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  About
                </Link>
              </li>
              <li>
                <Link to="/"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link to="/"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  Success Stories
                </Link>
              </li>
            
          </ul>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/"
                onClick={logout}
                className="hidden rounded-lg bg-[#add8e6] px-4 py-2 text-sm font-semibold text-[#0b3d91] transition hover:bg-[#9bcfe0] md:block"
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/SignIn"
                className="hidden rounded-lg bg-[#add8e6] px-4 py-2 text-sm font-semibold text-[#0b3d91] transition hover:bg-[#9bcfe0] md:block"
              >
                SignIn
              </Link>
              <Link
                to="/SignUp"
                className="hidden rounded-lg bg-[#add8e6] px-4 py-2 text-sm font-semibold text-[#0b3d91] transition hover:bg-[#9bcfe0] md:block"
              >
                SignUp
              </Link>
            </div>
          )}

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>

        <div
          className={`${menuOpen ? "mt-3 block" : "hidden"} rounded-xl border border-slate-200 bg-white p-3 md:hidden`}
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          {isAuthenticated ? (
            <div className="mt-3">
              <Link
                to="/"
                onClick={logout}
                className="inline-flex w-full items-center justify-center rounded-lg border border-[#9bcfe0] bg-[#add8e6] px-4 py-2 text-sm font-semibold text-[#0b3d91] shadow-sm transition hover:bg-[#9bcfe0]"
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                to="/SignIn"
                className="inline-flex w-full items-center justify-center rounded-lg border border-[#9bcfe0] bg-[#add8e6] px-4 py-2 text-sm font-semibold text-[#0b3d91] shadow-sm transition hover:bg-[#9bcfe0]"
              >
                Sign In
              </Link>
              <Link
                to="/SignUp"
                className="inline-flex w-full items-center justify-center rounded-lg border border-[#9bcfe0] bg-[#add8e6] px-4 py-2 text-sm font-semibold text-[#0b3d91] shadow-sm transition hover:bg-[#9bcfe0]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
  </nav>
  );
};

export default Navbar;
