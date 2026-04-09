import { useEffect, useState } from "react";
import Navbar from "../../shared/navbar";
import MobileSidebar from "./StudentMobileSidebar";
import Sidebar from "./StudentSidebar";
import { BASE_URL } from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";

const ViewInternship = () => {
    const {user} = useAuth();
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [applyingId, setApplyingId] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadInternships = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(`${BASE_URL}/student/internships`, {
                    signal: controller.signal
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

    const isExpired = (deadline) => {
        if (!deadline) return true;
        const today = new Date().setHours(0, 0, 0, 0);
        const end = new Date(deadline).setHours(0, 0, 0, 0);
        return end < today;
    };

    const handleApply = async (internshipId) => {
        try {
            setApplyingId(internshipId);

            const res = await fetch(`${BASE_URL}/apply_for_internship/${user.userId}/${internshipId}`, {
                method: "POST"
            });

            if (!res.ok) {
                throw new Error("Failed to apply");
            }

            alert("Application submitted successfully ✅");
        } catch (err) {
            alert(err.message || "Application failed");
        } finally {
            setApplyingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <MobileSidebar />
            <Sidebar />

            <main className="px-4 pb-8 pt-24 md:pl-[20rem] md:pr-8">

                {/* Header */}
                <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Internship Opportunities
                    </h1>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Explore and apply for internships posted by alumni.
                    </p>
                </section>

                {/* Error */}
                {error && (
                    <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
                        {error}
                    </p>
                )}

                {/* Content */}
                <section className="mt-6">
                    {loading ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div
                                    key={i}
                                    className="h-56 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"
                                />
                            ))}
                        </div>
                    ) : internships.length === 0 ? (
                        <p className="rounded-lg bg-white p-6 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800">
                            No internships available.
                        </p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {internships.map((item) => {
                                const expired = isExpired(item.applyDeadline);

                                return (
                                    <div
                                        key={item.internshipId}
                                        className={`relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900
                                        ${expired ? "opacity-60" : ""}`}
                                    >
                                        {/* Status badge */}
                                        <div className="mb-3 flex items-center justify-between">
                                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                                {item.mode}
                                            </span>

                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold
                                                ${expired
                                                    ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                                    : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                                }`}>
                                                {expired ? "Expired" : item.status}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                            {item.title}
                                        </h2>

                                        <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                                            {item.company} • {item.location}
                                        </p>

                                        {/* Description */}
                                        <p className="mt-3 line-clamp-3 text-sm text-slate-700 dark:text-slate-300">
                                            {item.description}
                                        </p>

                                        {/* Meta */}
                                        <div className="mt-4 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                                            <p><span className="font-medium">Duration:</span> {item.duration}</p>
                                            <p><span className="font-medium">Stipend:</span> ₹{item.stipend}</p>
                                            <p><span className="font-medium">Skills:</span> {item.skillRequired}</p>
                                            <p><span className="font-medium">Apply Before:</span> {item.applyDeadline}</p>
                                        </div>

                                        {/* Apply Button */}
                                        <div className="mt-5">
                                            <button
                                                onClick={() => handleApply(item.internshipId)}
                                                disabled={expired || applyingId === item.internshipId}
                                                className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition
                                                ${expired
                                                    ? "cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-800 dark:text-slate-500"
                                                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                                                }`}
                                            >
                                                {expired
                                                    ? "Deadline Passed"
                                                    : applyingId === item.internshipId
                                                        ? "Applying..."
                                                        : "Apply Now"}
                                            </button>
                                        </div>

                                        {/* Blur overlay for expired */}
                                        {expired && (
                                            <div className="pointer-events-none absolute inset-0 rounded-2xl backdrop-blur-[1px]" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default ViewInternship;