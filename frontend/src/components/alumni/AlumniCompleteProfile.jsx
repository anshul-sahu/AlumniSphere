import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../api";
import { useLocation, useNavigate } from "react-router-dom";

function AlumniCompleteProfile() {

    const [form, setForm] = useState({
        graduationYear: "",
        currentCompany: "",
        currentPosition: "",
        linkedInUrl: "",
        location: "",
        availableForMentornship: false,
        departmentId: ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    const [errors, setErrors] = useState({});

     const [department, setDepartment] = useState([]);

    useEffect(()=>{
        if(location.state == null){
            navigate('/signUp')
        }
    })
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

        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    };


    // VALIDATE SINGLE FIELD
    const validateField = (name, value) => {

        let error = "";

        // GRADUATION YEAR
        if (name === "graduationYear") {

            const yearRegex = /^\d{4}$/;

            const currentYear = new Date().getFullYear();

            if (!value) {

                error = "Graduation year is required.";

            } else if (!yearRegex.test(value)) {

                error = "Enter a valid 4-digit year.";

            } else if (
                Number(value) < 1950 ||
                Number(value) > currentYear
            ) {

                error = `Graduation year must be between 1950 and ${currentYear}.`;

            }

        }


        // CURRENT COMPANY
        if (name === "currentCompany") {

            const companyRegex = /^[A-Za-z0-9&.,()' -]{2,100}$/;

            if (!value.trim()) {

                error = "Current company is required.";

            } else if (!companyRegex.test(value)) {

                error = "Enter a valid company name.";

            }

        }


        // CURRENT POSITION
        if (name === "currentPosition") {

            const positionRegex = /^[A-Za-z0-9&.,()' -]{2,100}$/;

            if (!value.trim()) {

                error = "Current position is required.";

            } else if (!positionRegex.test(value)) {

                error = "Enter a valid current position.";

            }

        }


        // LINKEDIN URL
        if (name === "linkedInUrl") {

            const linkedInRegex =
                /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;

            if (!value.trim()) {

                error = "LinkedIn profile URL is required.";

            } else if (!linkedInRegex.test(value.trim())) {

                error = "Enter a valid LinkedIn profile URL.";

            }

        }


        // LOCATION
        if (name === "location") {

            const locationRegex = /^[A-Za-z., -]{2,100}$/;

            if (!value.trim()) {

                error = "Location is required.";

            } else if (!locationRegex.test(value)) {

                error = "Enter a valid location.";

            }

        }


        // DEPARTMENT
        if (name === "departmentId") {

            if (!value) {

                error = "Please select a department.";

            }

        }


        // SET ERROR
        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));

        return error;

    };


    // HANDLE BLUR
    const handleBlur = (e) => {

        const { name, value, type } = e.target;

        if (type !== "checkbox") {

            validateField(name, value);

        }

    };


    // HANDLE FORM SUBMIT
    const submitHandler = (e) => {

        e.preventDefault();

        let hasError = false;

        Object.keys(form).forEach((field) => {

            // Checkbox does not need validation
            if (field === "availableForMentornship") {
                return;
            }

            const error = validateField(
                field,
                form[field]
            );

            if (error) {

                hasError = true;

            }

        });


        if (hasError) {

            return;

        }
        // FINAL FORM DATA
        console.log(form);
        axios.post(`${api}/alumniProfile/${location.state.userId}`,form)
        .then((object)=>{
            console.log(object.data);
            navigate('/signIn');
        })
        .catch((err)=>{
            console.log(err);
        })
    };


    return (

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

                                Complete Alumni Profile

                            </h3>

                            <p className="mb-0 opacity-75">

                                Tell us about your professional journey

                            </p>

                        </div>


                        {/* FORM */}

                        <div className="card-body p-4 p-md-5">

                            <form
                                onSubmit={submitHandler}
                                noValidate
                            >


                                {/* GRADUATION YEAR */}

                                <div className="mb-4">

                                    <label
                                        htmlFor="graduationYear"
                                        className="form-label fw-semibold"
                                    >

                                        <i className="bi bi-calendar-check me-2 text-primary"></i>

                                        Graduation Year

                                    </label>


                                    <div className="input-group">

                                        <span className="input-group-text bg-white">

                                            <i className="bi bi-calendar-check text-primary"></i>

                                        </span>


                                        <input
                                            type="text"
                                            id="graduationYear"
                                            name="graduationYear"
                                            value={form.graduationYear}
                                            onChange={onChangeHandler}
                                            onBlur={handleBlur}
                                            placeholder="2024"
                                            maxLength="4"
                                            className={`form-control ${
                                                errors.graduationYear
                                                    ? "is-invalid"
                                                    : form.graduationYear
                                                    ? "is-valid"
                                                    : ""
                                            }`}
                                        />

                                    </div>


                                    {errors.graduationYear && (

                                        <div className="text-danger small mt-1">

                                            <i className="bi bi-exclamation-circle me-1"></i>

                                            {errors.graduationYear}

                                        </div>

                                    )}

                                </div>


                                {/* CURRENT COMPANY */}

                                <div className="mb-4">

                                    <label
                                        htmlFor="currentCompany"
                                        className="form-label fw-semibold"
                                    >

                                        <i className="bi bi-building me-2 text-primary"></i>

                                        Current Company

                                    </label>


                                    <div className="input-group">

                                        <span className="input-group-text bg-white">

                                            <i className="bi bi-building text-primary"></i>

                                        </span>


                                        <input
                                            type="text"
                                            id="currentCompany"
                                            name="currentCompany"
                                            value={form.currentCompany}
                                            onChange={onChangeHandler}
                                            onBlur={handleBlur}
                                            placeholder="TCS, Infosys, Google..."
                                            className={`form-control ${
                                                errors.currentCompany
                                                    ? "is-invalid"
                                                    : form.currentCompany
                                                    ? "is-valid"
                                                    : ""
                                            }`}
                                        />

                                    </div>


                                    {errors.currentCompany && (

                                        <div className="text-danger small mt-1">

                                            <i className="bi bi-exclamation-circle me-1"></i>

                                            {errors.currentCompany}

                                        </div>

                                    )}

                                </div>


                                {/* CURRENT POSITION */}

                                <div className="mb-4">

                                    <label
                                        htmlFor="currentPosition"
                                        className="form-label fw-semibold"
                                    >

                                        <i className="bi bi-briefcase me-2 text-primary"></i>

                                        Current Position

                                    </label>


                                    <div className="input-group">

                                        <span className="input-group-text bg-white">

                                            <i className="bi bi-briefcase-fill text-primary"></i>

                                        </span>


                                        <input
                                            type="text"
                                            id="currentPosition"
                                            name="currentPosition"
                                            value={form.currentPosition}
                                            onChange={onChangeHandler}
                                            onBlur={handleBlur}
                                            placeholder="Software Engineer"
                                            className={`form-control ${
                                                errors.currentPosition
                                                    ? "is-invalid"
                                                    : form.currentPosition
                                                    ? "is-valid"
                                                    : ""
                                            }`}
                                        />

                                    </div>


                                    {errors.currentPosition && (

                                        <div className="text-danger small mt-1">

                                            <i className="bi bi-exclamation-circle me-1"></i>

                                            {errors.currentPosition}

                                        </div>

                                    )}

                                </div>


                                {/* LINKEDIN URL */}

                                <div className="mb-4">

                                    <label
                                        htmlFor="linkedInUrl"
                                        className="form-label fw-semibold"
                                    >

                                        <i className="bi bi-linkedin me-2 text-primary"></i>

                                        LinkedIn Profile

                                    </label>


                                    <div className="input-group">

                                        <span className="input-group-text bg-white">

                                            <i className="bi bi-linkedin text-primary"></i>

                                        </span>


                                        <input
                                            type="url"
                                            id="linkedInUrl"
                                            name="linkedInUrl"
                                            value={form.linkedInUrl}
                                            onChange={onChangeHandler}
                                            onBlur={handleBlur}
                                            placeholder="https://linkedin.com/in/your-profile"
                                            className={`form-control ${
                                                errors.linkedInUrl
                                                    ? "is-invalid"
                                                    : form.linkedInUrl
                                                    ? "is-valid"
                                                    : ""
                                            }`}
                                        />

                                    </div>


                                    {errors.linkedInUrl && (

                                        <div className="text-danger small mt-1">

                                            <i className="bi bi-exclamation-circle me-1"></i>

                                            {errors.linkedInUrl}

                                        </div>

                                    )}

                                </div>


                                {/* LOCATION */}

                                <div className="mb-4">

                                    <label
                                        htmlFor="location"
                                        className="form-label fw-semibold"
                                    >

                                        <i className="bi bi-geo-alt me-2 text-primary"></i>

                                        Current Location

                                    </label>


                                    <div className="input-group">

                                        <span className="input-group-text bg-white">

                                            <i className="bi bi-geo-alt-fill text-primary"></i>

                                        </span>


                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={form.location}
                                            onChange={onChangeHandler}
                                            onBlur={handleBlur}
                                            placeholder="Jabalpur, Madhya Pradesh"
                                            className={`form-control ${
                                                errors.location
                                                    ? "is-invalid"
                                                    : form.location
                                                    ? "is-valid"
                                                    : ""
                                            }`}
                                        />

                                    </div>


                                    {errors.location && (

                                        <div className="text-danger small mt-1">

                                            <i className="bi bi-exclamation-circle me-1"></i>

                                            {errors.location}

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

                                        Department

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

                                            {
                                                department.map((dep,i)=>(
                                                    <option value={dep.departmentId}>
                                                        {dep.department}
                                                    </option>

                                                ))
                                            }

                                        </select>

                                    </div>


                                    {errors.departmentId && (

                                        <div className="text-danger small mt-1">

                                            <i className="bi bi-exclamation-circle me-1"></i>

                                            {errors.departmentId}

                                        </div>

                                    )}

                                </div>


                                {/* MENTORSHIP */}

                                <div className="mb-4">

                                    <div className="form-check form-switch border rounded-3 p-3">

                                        <input
                                            className="form-check-input ms-0 me-2"
                                            type="checkbox"
                                            role="switch"
                                            id="availableForMentornship"
                                            name="availableForMentornship"
                                            checked={form.availableForMentornship}
                                            onChange={onChangeHandler}
                                        />

                                        <label
                                            className="form-check-label fw-semibold"
                                            htmlFor="availableForMentornship"
                                        >

                                            <i className="bi bi-people-fill me-2 text-primary"></i>

                                            Available for Mentorship

                                        </label>

                                        <div className="text-muted small mt-1">

                                            Enable this if you are available to mentor students.

                                        </div>

                                    </div>

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

    );
}

export default AlumniCompleteProfile;