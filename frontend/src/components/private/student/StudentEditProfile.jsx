import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../../shared/Navbar";
import StudentSidebar from "./StudentSidebar";
import StudentMobileSidebar from "./StudentMobileSidebar";
import { useAuth } from "../../../context/AuthContext";
import { BASE_URL } from "../../../config/api";

const initialForm = {
    departmentId: "",
    enrollmentNo: "",
    resumeUrlPath: "",
    skill: "",
    yearOfAdmission: ""
};

const StudentEditProfile = () => {
    const { user: authUser } = useAuth();
    const userId = authUser?.userId;
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [departments, setDepartments] = useState([]);

    const storageKey = useMemo(() => `student_profile_draft_${userId ?? "unknown"}`, [userId]);

    const mapToForm = (data = {}) => ({
        departmentId: data.departmentId ?? "",
        enrollmentNo: data.enrollmentNo ?? "",
        resumeUrlPath: data.resumeUrlPath ?? "",
        skill: data.skill ?? "",
        yearOfAdmission: data.yearOfAdmission ?? ""
    });

    useEffect(() => {
    const loadDepartments = async () => {
        try {
            const res = await fetch(`${BASE_URL}/collect_all_department`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setDepartments(data);
            }
        } catch (err) {
            toast.error("Failed to load departments");
        }
    };

    loadDepartments();
}, []);

    useEffect(() => {
        const passedProfile = location.state?.studentDetail ?? location.state ?? null;
        const loadProfile = async () => {
            if (!userId) {
                setIsLoading(false);
                return;
            }

            let mergedData = initialForm;

            try {
                const localDraft = localStorage.getItem(storageKey);
                if (localDraft) {
                    mergedData = { ...mergedData, ...JSON.parse(localDraft) };
                }
            } catch {
                // Ignore parse errors and continue.
            }

            if (passedProfile && typeof passedProfile === "object") {
                mergedData = { ...mergedData, ...mapToForm(passedProfile) };
            }

            try {
                const response = await fetch(`${BASE_URL}/get_student/${userId}`);
                const data = await response.json();
                if (data?.success && data?.object) {
                    mergedData = { ...mergedData, ...mapToForm(data.object) };
                }
            } catch {
                // Keep current merged data if fetch fails.
            }

            setFormData(mergedData);
            setIsLoading(false);
        };

        loadProfile();
    }, [location.state, storageKey, userId]);

    useEffect(() => {
        if (!userId || isLoading) return;
        localStorage.setItem(storageKey, JSON.stringify(formData));
    }, [formData, isLoading, storageKey, userId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!userId) {
            toast.error("User not found. Please sign in again.");
            return;
        }

        const payload = {
            userId: userId,
            departmentId: Number(formData.departmentId),
            enrollmentNo: formData.enrollmentNo.trim(),
            resumeUrlPath: formData.resumeUrlPath.trim(),
            skill: formData.skill.trim(),
            yearOfAdmission: formData.yearOfAdmission.toString().trim()
        };

        const requestOptions = {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        };

        const endpoints = [
            // { url: `${BASE_URL}/update_student/${userId}`, method: "PUT" },
            { url: `${BASE_URL}/save_student/${userId}`, method: "POST" },
            { url: `${BASE_URL}/update_student`, method: "PUT" },
            { url: `${BASE_URL}/save_student`, method: "POST" }
        ];

        setIsSubmitting(true);
        let submitted = false;

        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint.url, { ...requestOptions, method: endpoint.method });
                if (!response.ok) continue;
                const data = await response.json().catch(() => ({}));
                if (data?.success === false) continue;
                submitted = true;
                break;
            } catch {
                // Try next endpoint.
            }
        }

        setIsSubmitting(false);

        if (!submitted) {
            toast.error("Unable to save profile right now.");
            return;
        }

        localStorage.setItem(storageKey, JSON.stringify(formData));
        toast.success("Profile saved successfully.");
        navigate("/student/profile");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />
            <StudentMobileSidebar />
            <StudentSidebar />

            <main className="min-h-screen overflow-y-auto pt-14 md:ml-64">
                <div className="mx-auto max-w-3xl p-4 sm:p-6 lg:p-8">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Edit Student Profile</h1>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            Fill details for first-time setup or update your existing profile.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                    >
                        <div className="grid gap-5 sm:grid-cols-2">
                            
                                <label className="text-sm text-slate-700 dark:text-slate-300">
    Department
    <select
        name="departmentId"
        value={formData.departmentId}
        onChange={handleInputChange}
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        required
    >
        <option value="">Select Department</option>
        {departments.map((dept) => (
            <option key={dept.departmentId} value={dept.departmentId}>
                {dept.name}
            </option>
        ))}
    </select>
</label>
                           

                            <label className="text-sm text-slate-700 dark:text-slate-300">
                                Enrollment No
                                <input
                                    type="text"
                                    name="enrollmentNo"
                                    value={formData.enrollmentNo}
                                    onChange={handleInputChange}
                                    placeholder="0206CS23"
                                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                    required
                                />
                            </label>

                            <label className="text-sm text-slate-700 dark:text-slate-300 sm:col-span-2">
                                Resume URL
                                <input
                                    type="text"
                                    name="resumeUrlPath"
                                    value={formData.resumeUrlPath}
                                    onChange={handleInputChange}
                                    placeholder="google.com/my-resume"
                                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                    required
                                />
                            </label>

                            <label className="text-sm text-slate-700 dark:text-slate-300 sm:col-span-2">
                                Skills
                                <input
                                    type="text"
                                    name="skill"
                                    value={formData.skill}
                                    onChange={handleInputChange}
                                    placeholder="java, python"
                                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                    required
                                />
                            </label>

                            <label className="text-sm text-slate-700 dark:text-slate-300">
                                Year Of Admission
                                <input
                                    type="number"
                                    name="yearOfAdmission"
                                    value={formData.yearOfAdmission}
                                    onChange={handleInputChange}
                                    placeholder="2025"
                                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                    required
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {isSubmitting ? "Saving..." : "Save Profile"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default StudentEditProfile;
