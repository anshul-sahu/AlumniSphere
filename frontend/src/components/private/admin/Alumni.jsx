import { useEffect, useState } from "react";
import Navbar from "../../shared/navbar";
import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";
import { BASE_URL } from "../../../config/api";

const Alumni = () => {
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [approvingId, setApprovingId] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadAlumni = async () => {
            try {
                setLoading(true);
                setError("");
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

    const handleApprove = async (userId) => {
        try {
            setApprovingId(userId);
            const res = await fetch(`${BASE_URL}/users/${userId}/approve`, {
                method: "PUT"
            });

            if (!res.ok) {
                throw new Error("Approval failed");
            }

            setAlumni((prev) =>
                prev.map((item) =>
                    item?.user?.userId === userId
                        ? { ...item, user: { ...item.user, status: "APPROVED" } }
                        : item
                )
            );
        } catch (err) {
            setError(err.message || "Approval failed");
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
                <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        Alumni Records
                    </h1>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Manage alumni details and approve pending profiles.
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
                    ) : alumni.length === 0 ? (
                        <p className="p-6 text-sm text-slate-600 dark:text-slate-300">
                            No alumni records found.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                    <tr>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">LinkedIn</th>
                                        <th className="px-4 py-3">Phone</th>
                                        <th className="px-4 py-3">Department</th>
                                        <th className="px-4 py-3">Company</th>
                                        <th className="px-4 py-3">Location</th>
                                        <th className="px-4 py-3">Graduation Year</th>
                                        <th className="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alumni.map((item) => {
                                        const user = item?.user || {};
                                        const pending = user.status === "PENDING";
                                        const userId = user.userId;

                                        return (
                                            <tr
                                                key={userId || `${user.email}-${item.graduationYear}`}
                                                className="border-t border-slate-200 dark:border-slate-800"
                                            >
                                                <td className="px-4 py-3">{user.name || "-"}</td>
                                                <td className="px-4 py-3">{user.email || "-"}</td>
                                                <td className="px-4 py-3">{user.status || "-"}</td>
                                                <td className="px-4 py-3">
                                                    {item.linkedInUrl ? (
                                                        <a
                                                            href={item.linkedInUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-blue-600 hover:underline dark:text-blue-400"
                                                        >
                                                            Profile
                                                        </a>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>
                                                <td className="px-4 py-3">{user.phone || "-"}</td>
                                                <td className="px-4 py-3">{item.departmentName || "-"}</td>
                                                <td className="px-4 py-3">{item.currentCompany || "-"}</td>
                                                <td className="px-4 py-3">{item.location || "-"}</td>
                                                <td className="px-4 py-3">{item.graduationYear || "-"}</td>
                                                <td className="px-4 py-3">
                                                    {pending ? (
                                                        <button
                                                            onClick={() => handleApprove(userId)}
                                                            disabled={approvingId === userId}
                                                            className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                                                        >
                                                            {approvingId === userId ? "Approving..." : "Approve"}
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                                            -
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

export default Alumni;
