import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../sidebar/Sidebar";
import { alumniSidebarItems } from "../../sidebar/sidebarData";
import axios from "axios";
import { api } from "../../api";

function UploadInternship() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        title: "",
        description: "",
        company: "",
        location: "",
        mode: "",
        duration: "",
        stipend: "",
        skillRequired: "",
        applyDeadline: ""
    });

    useEffect(() => {
        if (user == null) {
            navigate("/signIn");
        }
    }, [user, navigate]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(form);
        console.log(user.object.userId);
        axios.post(`${api}/upload/internship/${user.object.userId}`,form,{
            headers :{
                authorization : `Bearer ${token}`
            }
        }).then((object) => {
            console.log(object);
            alert('internship uploaded Successfully !!');
            navigate("/alumni/uploadedInternship")
        }).catch((err)=>{
            console.log(err);
            navigate("/signIn")
        })
    };

    return (
        <div className="d-flex min-vh-100 bg-light">

            {/* Sidebar */}
            <Sidebar items={alumniSidebarItems} />

            {/* Main Content */}
            <main className="flex-grow-1 p-3 p-md-4">

                <div className="container-fluid p-0">

                    {/* Page Header */}
                    <div className="mb-4">

                        <h2 className="fw-bold mb-1">
                            <i className="bi bi-briefcase-fill text-primary me-2"></i>
                            Post Internship Opportunity
                        </h2>

                        <p className="text-muted mb-0">
                            Share an internship opportunity with students and help
                            them take the next step in their career.
                        </p>

                    </div>


                    {/* Form Card */}
                    <div className="card border-0 shadow-sm rounded-4">

                        {/* Card Header */}
                        <div className="card-header bg-white border-0 p-4 p-md-5 pb-0">

                            <h5 className="fw-bold mb-1">
                                Internship Details
                            </h5>

                            <p className="text-muted small mb-0">
                                Fill in the details below to post an internship.
                            </p>

                        </div>


                        {/* Form */}
                        <div className="card-body p-4 p-md-5">

                            <form onSubmit={submitHandler}>

                                <div className="row g-4">

                                    {/* Internship Title */}
                                    <div className="col-12">

                                        <label
                                            htmlFor="title"
                                            className="form-label fw-semibold"
                                        >
                                            Internship Title
                                            <span className="text-danger ms-1">
                                                *
                                            </span>
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-white">
                                                <i className="bi bi-briefcase text-primary"></i>
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="title"
                                                placeholder="e.g. Java Backend Intern"
                                                name="title"
                                                value={form.title}
                                                onChange={onChangeHandler}
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Company */}
                                    <div className="col-12 col-md-6">

                                        <label
                                            htmlFor="company"
                                            className="form-label fw-semibold"
                                        >
                                            Company Name
                                            <span className="text-danger ms-1">
                                                *
                                            </span>
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-white">
                                                <i className="bi bi-building text-primary"></i>
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="company"
                                                placeholder="Company name"
                                                name="company"
                                                value={form.company}
                                                onChange={onChangeHandler}
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Location */}
                                    <div className="col-12 col-md-6">

                                        <label
                                            htmlFor="location"
                                            className="form-label fw-semibold"
                                        >
                                            Location
                                            <span className="text-danger ms-1">
                                                *
                                            </span>
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-white">
                                                <i className="bi bi-geo-alt text-primary"></i>
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="location"
                                                placeholder="e.g. Jabalpur, Madhya Pradesh"
                                                name="location"
                                                value={form.location}
                                                onChange={onChangeHandler}
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Work Mode */}
                                    <div className="col-12">

                                        <label className="form-label fw-semibold d-block">
                                            Work Mode
                                            <span className="text-danger ms-1">
                                                *
                                            </span>
                                        </label>

                                        <div className="row g-2">

                                            <div className="col-12 col-md-4">

                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="mode"
                                                    id="remote"
                                                    value="REMOTE"
                                                    checked={form.mode === "REMOTE"}
                                                    onChange={onChangeHandler}
                                                />

                                                <label
                                                    className="btn btn-outline-primary w-100 py-2"
                                                    htmlFor="remote"
                                                >
                                                    <i className="bi bi-laptop me-2"></i>
                                                    Remote
                                                </label>

                                            </div>


                                            <div className="col-12 col-md-4">

                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="mode"
                                                    id="onsite"
                                                    value="ONSITE"
                                                    checked={form.mode === "ONSITE"}
                                                    onChange={onChangeHandler}
                                                />

                                                <label
                                                    className="btn btn-outline-primary w-100 py-2"
                                                    htmlFor="onsite"
                                                >
                                                    <i className="bi bi-building me-2"></i>
                                                    Onsite
                                                </label>

                                            </div>


                                            <div className="col-12 col-md-4">

                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="mode"
                                                    id="hybrid"
                                                    value="HYBRID"
                                                    checked={form.mode === "HYBRID"}
                                                    onChange={onChangeHandler}
                                                />

                                                <label
                                                    className="btn btn-outline-primary w-100 py-2"
                                                    htmlFor="hybrid"
                                                >
                                                    <i className="bi bi-arrow-left-right me-2"></i>
                                                    Hybrid
                                                </label>

                                            </div>

                                        </div>

                                    </div>


                                    {/* Duration */}
                                    <div className="col-12 col-md-6">

                                        <label
                                            htmlFor="duration"
                                            className="form-label fw-semibold"
                                        >
                                            Duration
                                            <span className="text-danger ms-1">
                                                *
                                            </span>
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-white">
                                                <i className="bi bi-clock text-primary"></i>
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="duration"
                                                placeholder="e.g. 3 Months"
                                                name="duration"
                                                value={form.duration}
                                                onChange={onChangeHandler}
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Stipend */}
                                    <div className="col-12 col-md-6">

                                        <label
                                            htmlFor="stipend"
                                            className="form-label fw-semibold"
                                        >
                                            Stipend
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-white">
                                                ₹
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="stipend"
                                                placeholder="e.g. 10,000 per month"
                                                name="stipend"
                                                value={form.stipend}
                                                onChange={onChangeHandler}
                                            />

                                        </div>

                                    </div>


                                    {/* Skills Required */}
                                    <div className="col-12">

                                        <label
                                            htmlFor="skillRequired"
                                            className="form-label fw-semibold"
                                        >
                                            Skills Required
                                            <span className="text-danger ms-1">
                                                *
                                            </span>
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-white">
                                                <i className="bi bi-tools text-primary"></i>
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="skillRequired"
                                                placeholder="e.g. Java, Spring Boot, MySQL"
                                                name="skillRequired"
                                                value={form.skillRequired}
                                                onChange={onChangeHandler}
                                                required
                                            />

                                        </div>

                                        <div className="form-text">
                                            Separate multiple skills using commas.
                                        </div>

                                    </div>


                                    {/* Application Deadline */}
                                    <div className="col-12 col-md-6">

                                        <label
                                            htmlFor="applyDeadline"
                                            className="form-label fw-semibold"
                                        >
                                            Application Deadline
                                            <span className="text-danger ms-1">
                                                *
                                            </span>
                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text bg-white">
                                                <i className="bi bi-calendar-event text-primary"></i>
                                            </span>

                                            <input
                                                type="date"
                                                className="form-control"
                                                id="applyDeadline"
                                                name="applyDeadline"
                                                value={form.applyDeadline}
                                                onChange={onChangeHandler}
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* Description */}
                                    <div className="col-12">

                                        <label
                                            htmlFor="description"
                                            className="form-label fw-semibold"
                                        >
                                            Internship Description
                                            <span className="text-danger ms-1">
                                                *
                                            </span>
                                        </label>

                                        <textarea
                                            className="form-control"
                                            id="description"
                                            rows="5"
                                            placeholder="Describe the internship role, responsibilities, requirements and any other important details..."
                                            name="description"
                                            value={form.description}
                                            onChange={onChangeHandler}
                                            required
                                        ></textarea>

                                    </div>

                                </div>


                                {/* Form Actions */}
                                <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-5 pt-4 border-top">

                                    <button
                                        type="button"
                                        className="btn btn-light border px-4"
                                        onClick={() => navigate(-1)}
                                    >
                                        <i className="bi bi-arrow-left me-2"></i>
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4"
                                    >
                                        <i className="bi bi-cloud-arrow-up-fill me-2"></i>
                                        Post Internship
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default UploadInternship;