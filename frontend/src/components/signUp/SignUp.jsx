import { useEffect, useState } from "react";
import { api } from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: ""
    });
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState({
        show: false, message: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateField = (name, value) => {

        let error = "";

        if (name === "name") {
            const nameRegex = /^[A-Za-z ]{3,30}$/;

            if (!value.trim()) {
                error = "Name is required.";
            } else if (!nameRegex.test(value)) {
                error = "Name must contain only letters and be 3-30 characters.";
            }
        }

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!value.trim()) {
                error = "Email is required.";
            } else if (!emailRegex.test(value)) {
                error = "Enter a valid email address.";
            }
        }

        if (name === "password") {
            const passwordRegex =
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

            if (!value) {
                error = "Password is required.";
            } else if (!passwordRegex.test(value)) {
                error =
                    "Password must contain 8+ characters, uppercase, lowercase, number and special character.";
            }
        }

        if (name === "phone") {
            const phoneRegex = /^[6-9]\d{9}$/;

            if (!value) {
                error = "Phone number is required.";
            } else if (!phoneRegex.test(value)) {
                error = "Enter a valid 10-digit Indian phone number.";
            }
        }

        if (name === "role") {
            if (!value) {
                error = "Please select a role.";
            }
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));

        return error;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        let hasError = false;

        Object.keys(form).forEach((field) => {
            const error = validateField(field, form[field]);

            if (error) {
                hasError = true;
            }
        });
        if (hasError) {
            return;
        }

        const requestData = {
            ...form, 
            role : form.role.toUpperCase()
        }

        axios.post(`${api}/signUp`, requestData)
            .then((object) => {
                
                if(object.data.object.role == 'STUDENT'){
                    navigate("/Student/Profile/completion", {
                        state:{
                            userId :object.data.object.userId
                        }
                    });
                }else if(object.data.object.role == 'ALUMNI'){
                    navigate("/alumni/profile/completion", {
                        state:{
                            userId: object.data.object.userId
                        }
                    })
                }else{
                    navigate("/signIn")
                }

            }).catch((err) => {
                if(err.response){
                    if(err.response.status == 409)
                    setToast({ show: true, message: 'email already exists' });
                    else{
                        setToast({show: true, message:'Oops! something went wrong'});
                    }
                }
                console.log(err);
            })
    };

    useEffect(()=>{
        if(!toast.show)
            return;

        const timer = setTimeout(()=>{
            setToast({show:false, message:""})
        },3000)
        
        return () => clearTimeout(timer);
    },[toast.show])

    return (
        <>
            {toast.show && <div className="toast show  position-fixed end-0 align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        {toast.message}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>}
            <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">

                <div className="row w-100 justify-content-center">

                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">

                        <div className="card shadow-lg border-0 rounded-4">

                            {/* HEADER */}

                            <div className="card-header bg-primary text-white text-center py-4 rounded-top-4 border-0">

                                <div className="mb-2">
                                    <i className="bi bi-person-plus-fill fs-1"></i>
                                </div>

                                <h3 className="fw-bold mb-1">
                                    Create Account
                                </h3>

                                <p className="mb-0 opacity-75">
                                    Join our community today

                                </p>

                            </div>


                            {/* FORM */}

                            <div className="card-body p-4 p-md-5">

                                <form onSubmit={submitHandler} noValidate>

                                    {/* NAME */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="nameId"
                                            className="form-label fw-semibold"
                                        >
                                            <i className="bi bi-person me-2 text-primary"></i>
                                            Your Name
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-white">
                                                <i className="bi bi-person text-primary"></i>
                                            </span>

                                            <input
                                                type="text"
                                                className={`form-control ${errors.name
                                                    ? "is-invalid"
                                                    : form.name
                                                        ? "is-valid"
                                                        : ""
                                                    }`}
                                                id="nameId"
                                                name="name"
                                                value={form.name}
                                                onChange={onChangeHandler}
                                                onBlur={handleBlur}
                                                placeholder="Mohan Kumar"
                                            />

                                        </div>

                                        {errors.name && (
                                            <div className="text-danger small mt-1">
                                                <i className="bi bi-exclamation-circle me-1"></i>
                                                {errors.name}
                                            </div>
                                        )}

                                    </div>


                                    {/* EMAIL */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="emailId"
                                            className="form-label fw-semibold"
                                        >
                                            <i className="bi bi-envelope me-2 text-primary"></i>
                                            Email Address
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-white">
                                                <i className="bi bi-envelope text-primary"></i>
                                            </span>

                                            <input
                                                type="email"
                                                className={`form-control ${errors.email
                                                    ? "is-invalid"
                                                    : form.email
                                                        ? "is-valid"
                                                        : ""
                                                    }`}
                                                id="emailId"
                                                name="email"
                                                value={form.email}
                                                onChange={onChangeHandler}
                                                onBlur={handleBlur}
                                                placeholder="name@example.com"
                                            />

                                        </div>

                                        {errors.email && (
                                            <div className="text-danger small mt-1">
                                                <i className="bi bi-exclamation-circle me-1"></i>
                                                {errors.email}
                                            </div>
                                        )}

                                    </div>


                                    {/* PASSWORD */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="passwordId"
                                            className="form-label fw-semibold"
                                        >
                                            <i className="bi bi-lock me-2 text-primary"></i>
                                            Password
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-white">
                                                <i className="bi bi-lock-fill text-primary"></i>
                                            </span>

                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className={`form-control ${errors.password
                                                    ? "is-invalid"
                                                    : form.password
                                                        ? "is-valid"
                                                        : ""
                                                    }`}
                                                id="passwordId"
                                                name="password"
                                                value={form.password}
                                                onChange={onChangeHandler}
                                                onBlur={handleBlur}
                                                placeholder="Enter your password"
                                            />

                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={() =>
                                                    setShowPassword(!showPassword)
                                                }
                                            >
                                                <i
                                                    className={
                                                        showPassword
                                                            ? "bi bi-eye-slash"
                                                            : "bi bi-eye"
                                                    }
                                                ></i>
                                            </button>

                                        </div>

                                        {errors.password && (
                                            <div className="text-danger small mt-1">
                                                <i className="bi bi-exclamation-circle me-1"></i>
                                                {errors.password}
                                            </div>
                                        )}

                                    </div>


                                    {/* PHONE */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="phoneId"
                                            className="form-label fw-semibold"
                                        >
                                            <i className="bi bi-telephone me-2 text-primary"></i>
                                            Phone Number
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-white">
                                                <i className="bi bi-telephone-fill text-primary"></i>
                                            </span>

                                            <input
                                                type="tel"
                                                className={`form-control ${errors.phone
                                                    ? "is-invalid"
                                                    : form.phone
                                                        ? "is-valid"
                                                        : ""
                                                    }`}
                                                id="phoneId"
                                                name="phone"
                                                value={form.phone}
                                                onChange={onChangeHandler}
                                                onBlur={handleBlur}
                                                placeholder="9898535969"
                                                maxLength="10"
                                            />

                                        </div>

                                        {errors.phone && (
                                            <div className="text-danger small mt-1">
                                                <i className="bi bi-exclamation-circle me-1"></i>
                                                {errors.phone}
                                            </div>
                                        )}

                                    </div>


                                    {/* ROLE */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            <i className="bi bi-person-badge me-2 text-primary"></i>
                                            Select Role
                                        </label>

                                        <div className="row g-2">

                                            <div className="col-12 col-sm-4">

                                                <div className="form-check border rounded-3 p-3">

                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="role"
                                                        id="adminRole"
                                                        value="admin"
                                                        checked={form.role === "admin"}
                                                        onChange={onChangeHandler}
                                                    />

                                                    <label
                                                        className="form-check-label fw-semibold"
                                                        htmlFor="adminRole"
                                                    >
                                                        <i className="bi bi-shield-lock me-1 text-primary"></i>
                                                        Admin
                                                    </label>

                                                </div>

                                            </div>


                                            <div className="col-12 col-sm-4">

                                                <div className="form-check border rounded-3 p-3">

                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="role"
                                                        id="alumniRole"
                                                        value="alumni"
                                                        checked={form.role === "alumni"}
                                                        onChange={onChangeHandler}
                                                    />

                                                    <label
                                                        className="form-check-label fw-semibold"
                                                        htmlFor="alumniRole"
                                                    >
                                                        <i className="bi bi-mortarboard me-1 text-primary"></i>
                                                        Alumni
                                                    </label>

                                                </div>

                                            </div>


                                            <div className="col-12 col-sm-4">

                                                <div className="form-check border rounded-3 p-3">

                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="role"
                                                        id="studentRole"
                                                        value="student"
                                                        checked={form.role === "student"}
                                                        onChange={onChangeHandler}
                                                    />

                                                    <label
                                                        className="form-check-label fw-semibold"
                                                        htmlFor="studentRole"
                                                    >
                                                        <i className="bi bi-person-workspace me-1 text-primary"></i>
                                                        Student
                                                    </label>

                                                </div>

                                            </div>

                                        </div>

                                        {errors.role && (
                                            <div className="text-danger small mt-1">
                                                <i className="bi bi-exclamation-circle me-1"></i>
                                                {errors.role}
                                            </div>
                                        )}

                                    </div>


                                    {/* SUBMIT */}

                                    <div className="d-grid">

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg rounded-3"
                                        >
                                            <i className="bi bi-person-plus-fill me-2"></i>
                                            Create Account
                                        </button>

                                    </div>


                                    {/* SIGN IN */}

                                    <div className="text-center mt-4">

                                        <span className="text-muted">
                                            Already have an account?
                                        </span>

                                        <a
                                            href="/signin"
                                            className="text-primary fw-semibold text-decoration-none ms-1"
                                        >
                                            Sign In
                                        </a>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default SignUp;