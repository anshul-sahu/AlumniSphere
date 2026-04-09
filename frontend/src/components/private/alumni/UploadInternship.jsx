import { useState } from "react";
import Navbar from "../../shared/Navbar";
import AlumniSidebar from "./AlumniSidebar";
import AlumniMobileSidebar from "./AlumniMobileSidebar";
import { useAuth } from "../../../context/AuthContext";
import { BASE_URL } from "../../../config/api";

const UploadInternship = () => {
    const { user: authUser } = useAuth();
    const userId = authUser?.userId;

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        company: "",
        location: "",
        mode: "REMOTE",
        duration: "",
        stipend: "",
        skillRequired: "",
        applyDeadline: "",
        status: "ACTIVE"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setError("User not authenticated");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await fetch(`${BASE_URL}/upload/internship/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Failed to upload internship");

            setMessage("Internship posted successfully 🎉");

            setFormData({
                title: "",
                description: "",
                company: "",
                location: "",
                mode: "REMOTE",
                duration: "",
                stipend: "",
                skillRequired: "",
                applyDeadline: "",
                status: "ACTIVE"
            });

        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <Navbar />
            <AlumniMobileSidebar />
            <AlumniSidebar />

            <main className="min-h-screen overflow-y-auto pt-14 md:ml-64">
                <div className="mx-auto max-w-5xl p-6">

                    {/* Page Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                                Create Internship
                            </h1>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                Publish internship opportunities for students
                            </p>
                        </div>
                        <div className="hidden sm:block">
                            <span className="rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                Alumni Portal
                            </span>
                        </div>
                    </div>

                    {/* Alerts */}
                    {message && (
                        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 shadow-sm">
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm">
                            {error}
                        </div>
                    )}

                    {/* Main Card */}
                    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">

                        {/* Card Header */}
                        <div className="border-b border-slate-200 px-8 py-6 dark:border-slate-800">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                Internship Details
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Fill in the information carefully
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-8">

                            {/* Section 1 */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <Input label="Internship Title" name="title" value={formData.title} onChange={handleChange} placeholder="Backend Developer Intern" />
                                <Input label="Company Name" name="company" value={formData.company} onChange={handleChange} placeholder="Amazon" />
                            </div>

                            {/* Section 2 */}
                            <div className="grid gap-6 md:grid-cols-3">
                                <Input label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="Bangalore" />

                                <Select label="Mode" name="mode" value={formData.mode} onChange={handleChange}
                                    options={["REMOTE", "HYBRID", "ONSITE"]}
                                />

                                <Input label="Duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="3 Months" />
                            </div>

                            {/* Section 3 */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <Input label="Stipend (₹)" name="stipend" value={formData.stipend} onChange={handleChange} placeholder="15000" />
                                <Input label="Apply Deadline" type="date" name="applyDeadline" value={formData.applyDeadline} onChange={handleChange} />
                            </div>

                            {/* Section 4 */}
                            <div>
                                <Input label="Skills Required" name="skillRequired" value={formData.skillRequired} onChange={handleChange}
                                    placeholder="Java, Spring Boot, SQL, Microservices"
                                />
                            </div>

                            {/* Section 5 */}
                            <div>
                                <Textarea label="Internship Description" name="description" value={formData.description} onChange={handleChange}
                                    placeholder="Work on Spring Boot microservices and REST APIs"
                                />
                            </div>

                            {/* Section 6 */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <Select label="Status" name="status" value={formData.status} onChange={handleChange}
                                    options={["ACTIVE", "DRAFT", "CLOSED"]}
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl disabled:opacity-60"
                                >
                                    {loading ? "Publishing..." : "Publish Internship"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

/* ---------- Reusable UI Components ---------- */

const Input = ({ label, ...props }) => (
    <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
        <input
            {...props}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
    </div>
);

const Textarea = ({ label, ...props }) => (
    <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
        <textarea
            {...props}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
    </div>
);

const Select = ({ label, options, ...props }) => (
    <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
        <select
            {...props}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
            {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    </div>
);

export default UploadInternship;