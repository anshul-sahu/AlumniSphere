import { Link, useNavigate } from "react-router-dom";
import Navbar from "./shared/navbar";
import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../config/api";

const SignIn = () =>{
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const {login} = useAuth();
    
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(input);

        try{
            const res = await fetch(`${BASE_URL}/signIn`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(input)
            })
            const data = await res.json();
            console.log(data);
            if (data.success) {
                toast.success(data.message || "You have been registered successfully");
                const user = data.object;
                const role = user.role;

                login(user);

                if(role === 'ADMIN'){
                    navigate("/admin/dashboard");
                }else if(role === 'STUDENT'){
                    navigate('/student/dashboard');
                }else if(role === 'ALUMNI'){
                    navigate('/alumni/dashboard');
                }
            } else {
                toast.error(data.message || "login failed");
                // navigate("/");
            }
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Navbar />
            <div
                style={{
                    flex: 1,
                    padding: "20px 16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxSizing: "border-box",
                }}
            >
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
                                fontSize:"20px"
                            }}
                        >
                            Login
                        </h1>
                        

                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email" onChange={changeEventHandler}
                            placeholder="Enter your email"
                            required
                            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #bbb" }}
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password" onChange={changeEventHandler}
                            placeholder="Enter your password"
                            required
                            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #bbb" }}
                        />

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
                            SignIn
                        </button>

                        <p style={{ marginTop: "2px", textAlign: "center" }}>
                            Don't have an account? <Link to="/SignUp">SignUp</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
