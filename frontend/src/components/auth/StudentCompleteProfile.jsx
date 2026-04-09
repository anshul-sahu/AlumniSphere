import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BASE_URL } from "../../config/api";

const StudentCompleteProfile = () => {
    const location = useLocation();
    const { userId } = location.state || {};

    const [input, setInput] = useState({
        departmentId: "",
        enrollmentNo: "",
        resumeUrlPath: "",
        skill: "",
        yearOfAdmission: ""
    });

    const [errors, setErrors] = useState({});
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    /* =========================
       Load Departments
    ========================= */
    useEffect(() => {
        const loadDepartments = async () => {
            try {
                const res = await fetch(`${BASE_URL}/collect_all_department`);
                const data = await res.json();

                if (Array.isArray(data)) {
                    setDepartments(data);
                } else {
                    toast.error("Invalid department data");
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to load departments");
            }
        };

        loadDepartments();
    }, []);

    /* =========================
       Validation
    ========================= */
    const validate = () => {
        let newErrors = {};

        if (!input.departmentId) {
            newErrors.departmentId = "Department is required";
        }

        if (!input.enrollmentNo.trim()) {
            newErrors.enrollmentNo = "Enrollment No is required";
        }

        if (!input.resumeUrlPath.trim()) {
            newErrors.resumeUrlPath = "Resume URL is required";
        }

        if (!input.skill.trim()) {
            newErrors.skill = "Skill is required";
        }

        if (!input.yearOfAdmission) {
            newErrors.yearOfAdmission = "Year of admission is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* =========================
       Input Change Handler
    ========================= */
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    /* =========================
       Submit Handler
    ========================= */
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const res = await fetch(`${BASE_URL}/save_student/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    ...input
                })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Profile completed successfully 🎉");
                navigate("/student/dashboard");
            } else {
                toast.error(data.message || "Profile submission failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: "20px 16px", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: "460px" }}>
                    <form
                        onSubmit={onSubmitHandler}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            padding: "18px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                        }}
                    >
                        <h1
                            style={{
                                textAlign: "center",
                                marginBottom: "6px",
                                backgroundColor: "#add8e6",
                                color: "#0b3d91",
                                fontWeight: 800,
                                letterSpacing: "0.3px",
                                padding: "12px",
                                borderRadius: "8px",
                            }}
                        >
                            Complete Your Profile
                        </h1>

                        {/* Department */}
                        <label className="text-sm text-slate-700">
                            Department
                            <select
                                name="departmentId"
                                value={input.departmentId}
                                onChange={changeEventHandler}
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                            >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                    <option key={dept.departmentId} value={dept.departmentId}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                            {errors.departmentId && <span style={{ color: "red", fontSize: "12px" }}>{errors.departmentId}</span>}
                        </label>

                        {/* Enrollment No */}
                        <label className="text-sm text-slate-700">
                            Enrollment No
                            <input
                                type="text"
                                name="enrollmentNo"
                                value={input.enrollmentNo}
                                onChange={changeEventHandler}
                                placeholder="0206CS23"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                            />
                            {errors.enrollmentNo && <span style={{ color: "red", fontSize: "12px" }}>{errors.enrollmentNo}</span>}
                        </label>

                        {/* Resume URL */}
                        <label className="text-sm text-slate-700">
                            Resume URL
                            <input
                                type="text"
                                name="resumeUrlPath"
                                value={input.resumeUrlPath}
                                onChange={changeEventHandler}
                                placeholder="https://drive.google.com/..."
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                            />
                            {errors.resumeUrlPath && <span style={{ color: "red", fontSize: "12px" }}>{errors.resumeUrlPath}</span>}
                        </label>

                        {/* Skills */}
                        <label className="text-sm text-slate-700">
                            Skills
                            <input
                                type="text"
                                name="skill"
                                value={input.skill}
                                onChange={changeEventHandler}
                                placeholder="Java, Spring, React"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                            />
                            {errors.skill && <span style={{ color: "red", fontSize: "12px" }}>{errors.skill}</span>}
                        </label>

                        {/* Year */}
                        <label className="text-sm text-slate-700">
                            Year Of Admission
                            <input
                                type="number"
                                name="yearOfAdmission"
                                value={input.yearOfAdmission}
                                onChange={changeEventHandler}
                                placeholder="2025"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                            />
                            {errors.yearOfAdmission && <span style={{ color: "red", fontSize: "12px" }}>{errors.yearOfAdmission}</span>}
                        </label>

                        <button
                            type="submit"
                            style={{
                                padding: "10px",
                                border: "none",
                                borderRadius: "6px",
                                backgroundColor: "#add8e6",
                                color: "#0b3d91",
                                fontWeight: 600,
                                cursor: "pointer",
                                marginTop: "10px"
                            }}
                        >
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default StudentCompleteProfile;