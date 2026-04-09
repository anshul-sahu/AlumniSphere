import { useEffect, useState } from "react";
import Navbar from "../../shared/Navbar";
import StudentSidebar from "./StudentSidebar";
import StudentMobileSidebar from "./StudentMobileSidebar";
import { useAuth } from "../../../context/AuthContext";
import { BASE_URL } from "../../../config/api";
import { Link } from "react-router-dom";

const StudentViewProfile = () => {
    const { user: authUser } = useAuth();
    const userId = authUser?.userId;
    const [studentResponse, setStudentResponse] = useState({
        message: "Loading...",
        object: {},
        success: false
    });

    useEffect(() => {
        const loadStudentProfile = async () => {
            if (!userId) return;
            try {
                const response = await fetch(`${BASE_URL}/get_student/${userId}`);
                const data = await response.json();
                setStudentResponse(data);
            } catch (error) {
                setStudentResponse({
                    message: "Failed to load profile",
                    object: {},
                    success: false
                });
            }
        };

        loadStudentProfile();
    }, [userId]);

    const {object } = studentResponse;
    const {
        departmentName,
        enrollmentNo,
        resumeUrlPath,
        skill,
        user = {},
        yearOfAdmission
    } = object;

    const displayValue = (value) => value ?? "N/A";

    return (
        <>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                <Navbar />
                <StudentMobileSidebar />
                <StudentSidebar />

                <main className="min-h-screen overflow-y-auto pt-14 md:ml-64">
                    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Student Profile</h1>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                Welcome, {displayValue(user.name)}. Here is your profile overview.
                            </p>
                            <div className="mt-4 flex ">
                                <Link
                                    to="/student/edit"
                                    studentDetail={object}
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    Edit Profile
                                </Link>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Profile Info</h2>
                                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Student Name:</span> {displayValue(user.name)}</p>
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Role:</span> {displayValue(user.role)}</p>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Academic Info</h2>
                                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Enrollment No:</span> {displayValue(enrollmentNo)}</p>
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Admission Year:</span> {displayValue(yearOfAdmission)}</p>
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Skills:</span> {displayValue(skill)}</p>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Department Info</h2>
                                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Department:</span> {displayValue(departmentName)}</p>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                                <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Contact Info</h2>
                                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Email:</span> {displayValue(user.email)}</p>
                                    <p><span className="font-medium text-slate-900 dark:text-slate-100">Phone:</span> {displayValue(user.phone)}</p>
                                    <p>
                                        <span className="font-medium text-slate-900 dark:text-slate-100">Resume Link:</span>{" "}
                                        <a
                                            href={resumeUrlPath ? `https://${resumeUrlPath}` : "#"}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400"
                                        >
                                            {displayValue(resumeUrlPath)}
                                        </a>
                                    </p>
                                </div>
                            </section>
                        </div>

                        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Account Status</h2>
                            <div className="grid gap-3 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
                                <p><span className="font-medium text-slate-900 dark:text-slate-100">Status:</span> {displayValue(user.status)}</p>
                                
                                <p><span className="font-medium text-slate-900 dark:text-slate-100">Account Created Date:</span> {displayValue(user.createdAt)}</p>
                                
                               
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};

export default StudentViewProfile;
