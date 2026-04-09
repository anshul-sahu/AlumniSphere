import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BASE_URL } from "../../config/api";

const AlumniCompleteProfile = () => {
    const location = useLocation();
    const { userId } = location.state || {};

    const [input, setInput] = useState({
        graduationYear: "",
        linkedInUrl: "",
        currentCompany: "",
        currentPosition: "",
        location: "",
        availableForMentornship: false,
        departmentId: ""
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

        if (!input.departmentId) newErrors.departmentId = "Department is required";
        if (!input.graduationYear) newErrors.graduationYear = "Graduation year is required";
        if (!input.currentCompany.trim()) newErrors.currentCompany = "Current company is required";
        if (!input.currentPosition.trim()) newErrors.currentPosition = "Current position is required";
        if (!input.location.trim()) newErrors.location = "Location is required";
        if (!input.linkedInUrl.trim()) newErrors.linkedInUrl = "LinkedIn URL is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* =========================
       Input Change Handler
    ========================= */
    const changeEventHandler = (e) => {
        const { name, value, type, checked } = e.target;

        setInput((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    /* =========================
       Submit Handler
    ========================= */
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!userId) {
            toast.error("User not found. Please signup again.");
            navigate("/SignUp");
            return;
        }

        if (!validate()) return;

        try {
            const res = await fetch(`${BASE_URL}/alumniProfile/${userId}`, {
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
                toast.success("Alumni profile completed successfully 🎉");
                navigate("/alumni/dashboard");
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
                            Complete Alumni Profile
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

                        {/* Graduation Year */}
                        <label className="text-sm text-slate-700">
                            Graduation Year
                            <input
                                type="number"
                                name="graduationYear"
                                value={input.graduationYear}
                                onChange={changeEventHandler}
                                placeholder="2027"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                            />
                            {errors.graduationYear && <span style={{ color: "red", fontSize: "12px" }}>{errors.graduationYear}</span>}
                        </label>

                        {/* LinkedIn */}
                        <label className="text-sm text-slate-700">
                            LinkedIn URL
                            <input
                                type="text"
                                name="linkedInUrl"
                                value={input.linkedInUrl}
                                onChange={changeEventHandler}
                                placeholder="https://linkedin.com/in/username"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                            />
                            {errors.linkedInUrl && <span style={{ color: "red", fontSize: "12px" }}>{errors.linkedInUrl}</span>}
                        </label>

                        {/* Company */}
                        <label className="text-sm text-slate-700">
                            Current Company
                            <input
                                type="text"
                                name="currentCompany"
                                value={input.currentCompany}
                                onChange={changeEventHandler}
                                placeholder="Amazon"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                            />
                            {errors.currentCompany && <span style={{ color: "red", fontSize: "12px" }}>{errors.currentCompany}</span>}
                        </label>

                        {/* Position */}
                        <label className="text-sm text-slate-700">
                            Current Position
                            <input
                                type="text"
                                name="currentPosition"
                                value={input.currentPosition}
                                onChange={changeEventHandler}
                                placeholder="SDE-1"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                            />
                            {errors.currentPosition && <span style={{ color: "red", fontSize: "12px" }}>{errors.currentPosition}</span>}
                        </label>

                        {/* Location */}
                        <label className="text-sm text-slate-700">
                            Location
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="Hyderabad"
                                required
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                            />
                            {errors.location && <span style={{ color: "red", fontSize: "12px" }}>{errors.location}</span>}
                        </label>

                        {/* Mentorship */}
                        <label className="text-sm text-slate-700" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <input
                                type="checkbox"
                                name="availableForMentornship"
                                checked={input.availableForMentornship}
                                onChange={changeEventHandler}
                            />
                            Available for Mentorship
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

export default AlumniCompleteProfile;