import { useEffect, useState } from "react";
import Navbar from "../../shared/Navbar";
import AlumniSidebar from "./AlumniSidebar";
import AlumniMobileSidebar from "./AlumniMobileSidebar";
import { useAuth } from "../../../context/AuthContext";
import { BASE_URL } from "../../../config/api";
import { Link } from "react-router-dom";

const AlumniViewProfile = () => {
    const { user: authUser } = useAuth();
    const userId = authUser?.userId;

    const [alumniResponse, setAlumniResponse] = useState({
        message: "Loading...",
        object: {},
        success: false
    });

    useEffect(() => {
        const loadAlumniProfile = async () => {
            if (!userId) return;
            try {
                const response = await fetch(`${BASE_URL}/get_alumni/${userId}`);
                const data = await response.json();
                setAlumniResponse(data);
            } catch (error) {
                setAlumniResponse({
                    message: "Failed to load profile",
                    object: {},
                    success: false
                });
            }
        };

        loadAlumniProfile();
    }, [userId]);

    const { object } = alumniResponse;

    const {
        availableForMentornship,
        currentCompany,
        currentPosition,
        departmentName,
        graduationYear,
        linkedInUrl,
        location,
        user = {}
    } = object;

    const displayValue = (value) => value ?? "N/A";

    return (
        <>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <Navbar />
                <AlumniMobileSidebar />
                <AlumniSidebar />

                <main className="min-h-screen overflow-y-auto pt-14 md:ml-64">
                    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">

                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                Alumni Profile
                            </h1>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                Welcome, {displayValue(user.name)}. Here is your alumni profile overview.
                            </p>
                            {/* <div className="mt-4 flex">
                                <Link
                                    to="/alumni/edit"
                                    alumniDetail={object}
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    Edit Profile
                                </Link>
                            </div> */}
                        </div>

                        {/* Grid Sections */}
                        <div className="grid gap-6 md:grid-cols-2">

                            {/* Profile Info */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    Profile Info
                                </h2>
                                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Name:</span> {displayValue(user.name)}</p>
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Role:</span> {displayValue(user.role)}</p>
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Mentorship:</span> {availableForMentornship ? "Available" : "Not Available"}</p>
                                </div>
                            </section>

                            {/* Professional Info */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    Professional Info
                                </h2>
                                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Company:</span> {displayValue(currentCompany)}</p>
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Position:</span> {displayValue(currentPosition)}</p>
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Location:</span> {displayValue(location)}</p>
                                </div>
                            </section>

                            {/* Academic Info */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    Academic Info
                                </h2>
                                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Graduation Year:</span> {displayValue(graduationYear)}</p>
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Department:</span> {displayValue(departmentName)}</p>
                                </div>
                            </section>

                            {/* Contact Info */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    Contact Info
                                </h2>
                                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Email:</span> {displayValue(user.email)}</p>
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Phone:</span> {displayValue(user.phone)}</p>
                                    <p>
                                        <span className="font-medium text-slate-900 dark:text-slate-100">LinkedIn:</span>{" "}
                                        <a
                                            href={linkedInUrl || "#"}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400"
                                        >
                                            {displayValue(linkedInUrl)}
                                        </a>
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* Account Status */}
                        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                                Account Status
                            </h2>
                            <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
                                <p><span className="font-medium text-slate-900 dark:text-slate-100">Status:</span> {displayValue(user.status)}</p>
                                <p><span className="font-medium text-slate-900 dark:text-slate-100">Account Created Date:</span> {displayValue(user.createdAt)}</p>
                                <p><span className="font-medium text-slate-900 dark:text-slate-100">Email Verified:</span> {user.emailVerified ? "Yes" : "No"}</p>
                            </div>
                        </section>

                    </div>
                </main>
            </div>
        </>
    );
};

export default AlumniViewProfile;