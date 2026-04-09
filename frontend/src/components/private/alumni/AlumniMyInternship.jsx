import { useEffect, useState } from "react";
import Navbar from "../../shared/navbar";
import MobileSidebar from "./AlumniMobileSidebar";
import Sidebar from "./AlumniSidebar";
import { BASE_URL } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";

const AlumniMyInternships = () => {
    const {user} = useAuth();
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [approvingId, setApprovingId] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadInternships = async () => {
            try {
                setLoading(true);
                setError("");

                // 🔁 API: alumni internships + applicants
                const res = await fetch(`${BASE_URL}/uploaded_internship/${user.userId}`, {
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error("Failed to load internships");
                }

                const data = await res.json();
                setInternships(data?.object || []);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message || "Something went wrong");
                }
            } finally {
                setLoading(false);
            }
        };

        loadInternships();
        return () => controller.abort();
    }, []);

    /* 🎯 Approve Application */
    const handleApprove = async (internshipId, email) => {
        try {
            setApprovingId(`${internshipId}-${email}`);

            const res = await fetch(
                `${BASE_URL}/internship/approve/${internshipId}/${email}`,
                { method: "POST" }
            );

            if (!res.ok) throw new Error("Approval failed");

            alert("Application approved successfully ✅");

        } catch (err) {
            alert(err.message || "Approval failed");
        } finally {
            setApprovingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <MobileSidebar />
            <Sidebar />

            <main className="px-4 pb-6 pt-24 md:pl-[20rem] md:pr-8">

                {/* Header */}
                <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        My Internships
                    </h1>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Manage your posted internships and review applicants
                    </p>
                </section>

                {error && (
                    <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
                        {error}
                    </p>
                )}

                {/* Internship Cards */}
                <section className="mt-6 space-y-6">
                    {loading ? (
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            Loading internships...
                        </p>
                    ) : internships.length === 0 ? (
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            No internships posted yet.
                        </p>
                    ) : (
                        internships.map((intern) => (
                            <div
                                key={intern.internshipId}
                                className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
                            >
                                {/* Internship Info */}
                                <div className="p-5 border-b dark:border-slate-800">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                                {intern.title}
                                            </h2>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                                {intern.company} • {intern.location} • {intern.mode}
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                                            {intern.status}
                                        </span>
                                    </div>

                                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <p><b>Duration:</b> {intern.duration}</p>
                                        <p><b>Stipend:</b> ₹{intern.stipend}</p>
                                        <p><b>Deadline:</b> {intern.applyDeadline}</p>
                                        <p><b>Skills:</b> {intern.skillRequired}</p>
                                    </div>
                                </div>

                                {/* Applicants */}
                                <div className="p-5">
                                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                                        Applicants ({intern.internApp.length})
                                    </h3>

                                    {intern.internApp.length === 0 ? (
                                        <p className="text-sm text-slate-500">
                                            No applications yet.
                                        </p>
                                    ) : (
                                        <div className="space-y-3">
                                            {intern.internApp.map((app, idx) => {
                                                const user = app.userAppDto || {};
                                                const std = user.stdInDto || {};

                                                return (
                                                    <div
                                                        key={idx}
                                                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-lg border p-3 dark:border-slate-800"
                                                    >
                                                        {/* Student Info */}
                                                        <div className="text-sm">
                                                            <p className="font-medium text-slate-900 dark:text-slate-100">
                                                                {user.name}
                                                            </p>
                                                            <p className="text-slate-600 dark:text-slate-300">
                                                                {user.email} • {user.phone}
                                                            </p>
                                                            <p className="text-slate-500 text-xs">
                                                                {std.enrollmentNo}
                                                            </p>

                                                            {std.resumeUrlPath && (
                                                                <a
                                                                    href={
                                                                        std.resumeUrlPath.startsWith("http")
                                                                            ? std.resumeUrlPath
                                                                            : `https://${std.resumeUrlPath}`
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-blue-600 underline text-xs"
                                                                >
                                                                    View Resume
                                                                </a>
                                                            )}
                                                        </div>

                                                        {/* Status + Action */}
                                                        <div className="flex items-center gap-3">
                                                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                                                {app.status}
                                                            </span>

                                                            <button
                                                                onClick={() =>
                                                                    handleApprove(
                                                                        intern.internshipId,
                                                                        user.email
                                                                    )
                                                                }
                                                                disabled={approvingId === `${intern.internshipId}-${user.email}`}
                                                                className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
                                                            >
                                                                {approvingId === `${intern.internshipId}-${user.email}`
                                                                    ? "Approving..."
                                                                    : "Approve"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </main>
        </div>
    );
};

export default AlumniMyInternships;