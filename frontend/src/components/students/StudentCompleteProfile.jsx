import { useEffect, useState } from "react";
import { api } from "../api";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function StudentCompleteProfile() {

    const location = useLocation();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        enrollmentNo: "",
        skill: "",
        yearOfAdmission: "",
        aboutUs: "",
        departmentId: ""
    });

    const [errors, setErrors] = useState({});

    const [toast, setToast] = useState({
        show: false,
        message: ""
    });

    const [department, setDepartment] = useState([]);

    // FETCH ALL DEPARTMENTS
    useEffect(() => {

        axios.get(`${api}/collect_all_department`)
            .then((response) => {

                setDepartment(response.data);

            })
            .catch((err) => {

                console.log(err);

            });

    }, []);


    // HANDLE INPUT CHANGE
    const onChangeHandler = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    // VALIDATE FIELDS
    const validateField = (name, value) => {

        let error = "";

        // ENROLLMENT NUMBER
        if (name === "enrollmentNo") {

            const enrollmentRegex = /^[A-Za-z0-9]{3,30}$/;

            if (!value.trim()) {

                error = "Enrollment number is required.";

            } else if (!enrollmentRegex.test(value)) {

                error = "Enrollment number must contain only letters and numbers.";

            }

        }


        // SKILLS
        if (name === "skill") {

            const skillRegex = /^[A-Za-z0-9,#. ]{3,100}$/;

            if (!value.trim()) {

                error = "Skills are required.";

            } else if (!skillRegex.test(value)) {

                error = "Skills contain invalid characters.";

            }

        }


        // YEAR OF ADMISSION
        if (name === "yearOfAdmission") {

            const yearRegex = /^\d{4}$/;

            if (!value) {

                error = "Year of admission is required.";

            } else if (!yearRegex.test(value)) {

                error = "Enter a valid 4-digit year.";

            }

        }


        // DEPARTMENT
        if (name === "departmentId") {

            if (!value) {

                error = "Please select a department.";

            }

        }


        // ABOUT YOURSELF
        if (name === "aboutUs") {

            if (!value.trim()) {

                error = "Please write something about yourself.";

            }

        }


        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));

        return error;

    };


    // HANDLE BLUR
    const handleBlur = (e) => {

        const { name, value } = e.target;

        validateField(name, value);

    };


    // SUBMIT FORM
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

        axios.post(
            `${api}/save_student/${location.state?.userId}`,
            form
        )
            .then((response) => {

                // console.log(response.data);

                setToast({
                    show: true,
                    message: "Profile completed successfully."
                });
                navigate('/signIn');
            })
            .catch((err) => {

                if (err.response) {

                    if (err.response.status === 409) {

                        setToast({
                            show: true,
                            message: "Student profile already exists."
                        });

                    } else {

                        setToast({
                            show: true,
                            message: "Oops! Something went wrong."
                        });

                    }

                } else {

                    setToast({
                        show: true,
                        message: "Server connection failed."
                    });

                }

                console.log(err);

            });

    };


    // AUTO HIDE TOAST
    useEffect(() => {

        if (!toast.show) return;

        const timer = setTimeout(() => {

            setToast({
                show: false,
                message: ""
            });

        }, 3000);

        return () => clearTimeout(timer);

    }, [toast.show]);


    return (

        <>

            {/* TOAST */}

            {toast.show && (

                <div
                    className="toast show position-fixed top-0 end-0 m-3 align-items-center text-bg-danger border-0"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    style={{ zIndex: 9999 }}
                >

                    <div className="d-flex">
                        <div className="toast-body">
                            {toast.message}
                        </div>

                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            onClick={() =>
                                setToast({
                                    show: false,
                                    message: ""
                                })
                            }
                            aria-label="Close"
                        ></button>

                    </div>

                </div>

            )}


            <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">

                <div className="row w-100 justify-content-center">

                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">

                        <div className="card shadow-lg border-0 rounded-4">


                            {/* HEADER */}

                            <div className="card-header bg-primary text-white text-center py-4 rounded-top-4 border-0">

                                <div className="mb-2">

                                    <i className="bi bi-mortarboard-fill fs-1"></i>

                                </div>

                                <h3 className="fw-bold mb-1">

                                    Complete Student Profile

                                </h3>

                                <p className="mb-0 opacity-75">

                                    Complete your profile to continue

                                </p>

                            </div>


                            {/* FORM */}

                            <div className="card-body p-4 p-md-5">

                                <form
                                    onSubmit={submitHandler}
                                    noValidate
                                >


                                    {/* ENROLLMENT NUMBER */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="enrollmentNoId"
                                            className="form-label fw-semibold"
                                        >

                                            <i className="bi bi-card-text me-2 text-primary"></i>

                                            Enrollment Number

                                        </label>


                                        <div className="input-group">

                                            <span className="input-group-text bg-white">

                                                <i className="bi bi-card-text text-primary"></i>

                                            </span>


                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.enrollmentNo
                                                        ? "is-invalid"
                                                        : form.enrollmentNo
                                                        ? "is-valid"
                                                        : ""
                                                }`}
                                                id="enrollmentNoId"
                                                name="enrollmentNo"
                                                value={form.enrollmentNo}
                                                onChange={onChangeHandler}
                                                onBlur={handleBlur}
                                                placeholder="0206CS231001"
                                            />

                                        </div>


                                        {errors.enrollmentNo && (

                                            <div className="text-danger small mt-1">

                                                <i className="bi bi-exclamation-circle me-1"></i>

                                                {errors.enrollmentNo}

                                            </div>

                                        )}

                                    </div>


                                    {/* DEPARTMENT */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="departmentId"
                                            className="form-label fw-semibold"
                                        >

                                            <i className="bi bi-building me-2 text-primary"></i>

                                            Select Department

                                        </label>


                                        <div className="input-group">

                                            <span className="input-group-text bg-white">

                                                <i className="bi bi-building text-primary"></i>

                                            </span>


                                            <select
                                                id="departmentId"
                                                name="departmentId"
                                                value={form.departmentId}
                                                onChange={onChangeHandler}
                                                onBlur={handleBlur}
                                                className={`form-select ${
                                                    errors.departmentId
                                                        ? "is-invalid"
                                                        : form.departmentId
                                                        ? "is-valid"
                                                        : ""
                                                }`}
                                            >

                                                <option value="">

                                                    Select Department

                                                </option>


                                                {department.map((dep) => (

                                                    <option
                                                        key={dep.departmentId}
                                                        value={dep.departmentId}
                                                    >

                                                        {dep.name}

                                                    </option>

                                                ))}

                                            </select>

                                        </div>


                                        {errors.departmentId && (

                                            <div className="text-danger small mt-1">

                                                <i className="bi bi-exclamation-circle me-1"></i>

                                                {errors.departmentId}

                                            </div>

                                        )}

                                    </div>


                                    {/* SKILLS */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="skills"
                                            className="form-label fw-semibold"
                                        >

                                            <i className="bi bi-tools me-2 text-primary"></i>

                                            Your Skills

                                        </label>


                                        <div className="input-group">

                                            <span className="input-group-text bg-white">

                                                <i className="bi bi-tools text-primary"></i>

                                            </span>


                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.skill
                                                        ? "is-invalid"
                                                        : form.skill
                                                        ? "is-valid"
                                                        : ""
                                                }`}
                                                id="skills"
                                                name="skill"
                                                value={form.skill}
                                                onChange={onChangeHandler}
                                                onBlur={handleBlur}
                                                placeholder="Java, Python, React"
                                            />

                                        </div>


                                        {errors.skill && (

                                            <div className="text-danger small mt-1">

                                                <i className="bi bi-exclamation-circle me-1"></i>

                                                {errors.skill}

                                            </div>

                                        )}

                                    </div>


                                    {/* YEAR OF ADMISSION */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="yearOfAdmissionId"
                                            className="form-label fw-semibold"
                                        >

                                            <i className="bi bi-calendar-date me-2 text-primary"></i>

                                            Year of Admission

                                        </label>


                                        <div className="input-group">

                                            <span className="input-group-text bg-white">

                                                <i className="bi bi-calendar-date-fill text-primary"></i>

                                            </span>


                                            <input
                                                type="text"
                                                className={`form-control ${
                                                    errors.yearOfAdmission
                                                        ? "is-invalid"
                                                        : form.yearOfAdmission
                                                        ? "is-valid"
                                                        : ""
                                                }`}
                                                id="yearOfAdmissionId"
                                                name="yearOfAdmission"
                                                value={form.yearOfAdmission}
                                                onChange={onChangeHandler}
                                                onBlur={handleBlur}
                                                placeholder="2023"
                                                maxLength="4"
                                            />

                                        </div>


                                        {errors.yearOfAdmission && (

                                            <div className="text-danger small mt-1">

                                                <i className="bi bi-exclamation-circle me-1"></i>

                                                {errors.yearOfAdmission}

                                            </div>

                                        )}

                                    </div>


                                    {/* ABOUT YOURSELF */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="aboutUs"
                                            className="form-label fw-semibold"
                                        >

                                            <i className="bi bi-person-lines-fill me-2 text-primary"></i>

                                            About Yourself

                                        </label>


                                        <div className="input-group">

                                            <span className="input-group-text bg-white align-items-start pt-3">

                                                <i className="bi bi-person-lines-fill text-primary"></i>

                                            </span>


                                            <textarea
                                                className={`form-control ${
                                                    errors.aboutUs
                                                        ? "is-invalid"
                                                        : form.aboutUs
                                                        ? "is-valid"
                                                        : ""
                                                }`}
                                                id="aboutUs"
                                                name="aboutUs"
                                                value={form.aboutUs}
                                                onChange={onChangeHandler}
                                                onBlur={handleBlur}
                                                placeholder="I am a backend developer..."
                                                rows="4"
                                            ></textarea>

                                        </div>


                                        {errors.aboutUs && (

                                            <div className="text-danger small mt-1">

                                                <i className="bi bi-exclamation-circle me-1"></i>

                                                {errors.aboutUs}

                                            </div>

                                        )}

                                    </div>


                                    {/* SUBMIT */}

                                    <div className="d-grid">

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg rounded-3"
                                        >

                                            <i className="bi bi-check-circle-fill me-2"></i>

                                            Complete Profile

                                        </button>

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

export default StudentCompleteProfile;