import { useEffect, useState, useMemo } from "react";
import Navbar from "../../shared/navbar";
import MobileSidebar from "./StudentMobileSidebar";
import Sidebar from "./StudentSidebar";
import { BASE_URL } from "../../../config/api";

const StudentAlumni = () => {
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [requestingId, setRequestingId] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadAlumni = async () => {
            try {
                setLoading(true);
                setError("");

                // 🔁 API that returns alumni list
                const res = await fetch(`${BASE_URL}/collect_all_alumni`, {
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error("Failed to load alumni");
                }

                const data = await res.json();
                setAlumni(Array.isArray(data) ? data : []);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message || "Something went wrong");
                }
            } finally {
                setLoading(false);
            }
        };

        loadAlumni();
        return () => controller.abort();
    }, []);

    /* ✅ Only ACTIVE alumni */
    const activeAlumni = useMemo(() => {
        return alumni.filter(item => item?.user?.status === "ACTIVE");
    }, [alumni]);

    /* 🎯 Mentorship Request */
    const handleMentorshipRequest = async (alumniId) => {
        try {
            setRequestingId(alumniId);

            // 🔁 Example API endpoint (change if needed)
            const res = await fetch(`${BASE_URL}/mentorship/request/${alumniId}`, {
                method: "POST",
            });

            if (!res.ok) {
                throw new Error("Failed to send mentorship request");
            }

            alert("Mentorship request sent successfully!");
        } catch (err) {
            alert(err.message || "Mentorship request failed");
        } finally {
            setRequestingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <MobileSidebar />
            <Sidebar />

            <main className="px-4 pb-6 pt-24 md:pl-[20rem] md:pr-8">
                <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Alumni Directory
                    </h1>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Connect with active alumni and request mentorship.
                    </p>
                </section>

                {error && (
                    <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
                        {error}
                    </p>
                )}

                <section className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                    {loading ? (
                        <p className="p-6 text-sm text-slate-600 dark:text-slate-300">
                            Loading alumni...
                        </p>
                    ) : activeAlumni.length === 0 ? (
                        <p className="p-6 text-sm text-slate-600 dark:text-slate-300">
                            No active alumni found.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Company</th>
                                        <th className="px-4 py-3">Position</th>
                                        <th className="px-4 py-3">Location</th>
                                        <th className="px-4 py-3">Graduation</th>
                                        <th className="px-4 py-3">Department</th>
                                        <th className="px-4 py-3">LinkedIn</th>
                                        <th className="px-4 py-3">Mentorship</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {activeAlumni.map((item) => {
                                        const user = item?.user || {};
                                        const alumniId = user.userId;

                                        return (
                                            <tr
                                                key={alumniId}
                                                className="border-t border-slate-200 dark:border-slate-800"
                                            >
                                                <td className="px-4 py-3 font-medium">{user.name || "-"}</td>
                                                <td className="px-4 py-3">{user.email || "-"}</td>
                                                <td className="px-4 py-3">{item.currentCompany || "-"}</td>
                                                <td className="px-4 py-3">{item.currentPosition || "-"}</td>
                                                <td className="px-4 py-3">{item.location || "-"}</td>
                                                <td className="px-4 py-3">{item.graduationYear || "-"}</td>
                                                <td className="px-4 py-3">{item.departmentName || "-"}</td>
                                                <td className="px-4 py-3">
                                                    {item.linkedInUrl ? (
                                                        <a
                                                            href={
                                                                item.linkedInUrl.startsWith("http")
                                                                    ? item.linkedInUrl
                                                                    : `https://${item.linkedInUrl}`
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400"
                                                        >
                                                            Profile
                                                        </a>
                                                    ) : "-"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    {item.availableForMentornship ? (
                                                        <button
                                                            onClick={() => handleMentorshipRequest(alumniId)}
                                                            disabled={requestingId === alumniId}
                                                            className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
                                                        >
                                                            {requestingId === alumniId
                                                                ? "Requesting..."
                                                                : "Request Mentorship"}
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs text-slate-500">
                                                            Not Available
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default StudentAlumni;