import { useEffect, useState, useMemo } from "react";
import Navbar from "../../shared/navbar";
import MobileSidebar from "./AlumniMobileSidebar";
import Sidebar from "./AlumniSidebar";
import { BASE_URL } from "../../../config/api";

const AlumniStudent = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const loadStudents = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(`${BASE_URL}/collect_all_student`, {
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error("Failed to load students");
                }

                const data = await res.json();
                setStudents(Array.isArray(data) ? data : []);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message || "Something went wrong");
                }
            } finally {
                setLoading(false);
            }
        };

        loadStudents();
        return () => controller.abort();
    }, []);

    /* ✅ Filter only ACTIVE students */
    const activeStudents = useMemo(() => {
        return students.filter(
            (item) => item?.user?.status === "ACTIVE"
        );
    }, [students]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <MobileSidebar />
            <Sidebar />

            <main className="px-4 pb-6 pt-24 md:pl-[20rem] md:pr-8">
                <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Active Students
                    </h1>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        View all active students available for alumni interaction.
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
                            Loading students...
                        </p>
                    ) : activeStudents.length === 0 ? (
                        <p className="p-6 text-sm text-slate-600 dark:text-slate-300">
                            No active students found.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Phone</th>
                                        <th className="px-4 py-3">Enrollment No</th>
                                        <th className="px-4 py-3">Year</th>
                                        <th className="px-4 py-3">Department</th>
                                        <th className="px-4 py-3">Skills</th>
                                        <th className="px-4 py-3">Resume</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {activeStudents.map((item) => {
                                        const user = item?.user || {};
                                        const userId = user.userId;

                                        return (
                                            <tr
                                                key={userId}
                                                className="border-t border-slate-200 dark:border-slate-800"
                                            >
                                                <td className="px-4 py-3">{user.name || "-"}</td>
                                                <td className="px-4 py-3">{user.email || "-"}</td>
                                                <td className="px-4 py-3">{user.phone || "-"}</td>
                                                <td className="px-4 py-3">{item.enrollmentNo || "-"}</td>
                                                <td className="px-4 py-3">{item.yearOfAdmission || "-"}</td>
                                                <td className="px-4 py-3">{item.departmentName || "-"}</td>
                                                <td className="px-4 py-3">{item.skill || "-"}</td>
                                                <td className="px-4 py-3">
                                                    {item.resumeUrlPath ? (
                                                        <a
                                                            href={
                                                                item.resumeUrlPath.startsWith("http")
                                                                    ? item.resumeUrlPath
                                                                    : `https://${item.resumeUrlPath}`
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400"
                                                        >
                                                            View
                                                        </a>
                                                    ) : "-"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                        ACTIVE
                                                    </span>
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

export default AlumniStudent;