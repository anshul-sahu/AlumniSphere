import { Link, useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import { useState } from "react";
import { toast } from "sonner"
import { BASE_URL } from "../config/api";

const SignUp = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let newErrors = {};
        if (!/^[A-Za-z ]+$/.test(input.name)) {
            newErrors.name = "Name must contain letter";
        }

        if (!/^[0-9]{10}$/.test(input.phone)) {
            newErrors.phone = "Phone number must be exactly 10 digits";
        }

        if (input.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }


        if (!input.role) {
            newErrors.role = "Please select a role";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        input.role = input.role.toUpperCase();
        // console.log(input);
        if (!validate()) {
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/signUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            })
            const data = await res.json();
            console.log(data);
            if (data.success) {
                toast.success(data.message || "You have been registered successfully");
                const user = data.object;
                const userId = user.userId;

                if (user.role === "STUDENT") {
                    navigate("/student/complete_profile", {
                        state: { userId }
                    });
                }else if(user.role === "ALUMNI"){
                    navigate("/alumni/complete_profile",{state:{userId}});
                }
                // navigate("/SignIn");
            } else {
                toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Navbar />
            <div style={{ padding: "20px 16px", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: "460px" }}>
                    <form onSubmit={onSubmitHandler}
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
                            Create Your Account
                        </h1>
                        <label htmlFor="name">Your Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            required
                            onChange={changeEventHandler}
                            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #bbb" }}
                        />{errors.name && <span style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>}

                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            required
                            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #bbb" }}
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            required
                            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #bbb" }}
                        />
                        {errors.password && <span style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>}

                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            onChange={changeEventHandler}
                            placeholder="Enter phone number"
                            required
                            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #bbb" }}
                        />
                        {errors.phone && <span style={{ color: "red", fontSize: "12px" }}>{errors.phone}</span>}

                        <fieldset style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "10px" }}>
                            <legend style={{ padding: "0 6px" }}>Role</legend>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                                <label style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                    <input type="radio" name="role" onChange={changeEventHandler} checked={input.role === 'alumni'} value="alumni" required /> Alumni
                                </label>
                                <label style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                    <input type="radio" name="role" onChange={changeEventHandler} checked={input.role === 'student'} value="student" /> Student
                                </label>
                                <label style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                    <input type="radio" name="role" onChange={changeEventHandler} checked={input.role === 'admin '} value="admin" /> Admin
                                </label>
                            </div>
                        </fieldset>

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
                            }}
                        >
                            Submit
                        </button>

                        <p style={{ marginTop: "2px", textAlign: "center" }}>
                            Already have an account? <Link to="/SignIn">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
