import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
    FaTruck,
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

export default function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const register = async () => {

        try {

            setLoading(true);

            await API.post("/auth/register", form);

            toast.success("Registration Successful");

            setTimeout(() => {

                navigate("/login");

            }, 1200);

        }

        catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Registration Failed"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>
            <Toaster/>

            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    minHeight:"100vh",
                    background:
                    "linear-gradient(135deg,#2563eb,#1e3a8a)"
                }}
            >

                <div
                    className="card shadow-lg border-0"
                    style={{
                        width:"430px",
                        borderRadius:"20px"
                    }}
                >

                    <div className="card-body p-4">

                        <div className="text-center mb-4">

                            <FaTruck
                                size={55}
                                color="#2563eb"
                            />

                            <h2 className="fw-bold mt-3">

                                Create Account

                            </h2>

                            <p className="text-muted">

                                Join Last Mile Delivery

                            </p>

                        </div>

                        <div className="input-group mb-3">

                            <span className="input-group-text">

                                <FaUser/>

                            </span>

                            <input

                                className="form-control"

                                placeholder="Full Name"

                                name="name"

                                value={form.name}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="input-group mb-3">

                            <span className="input-group-text">

                                <FaEnvelope/>

                            </span>

                            <input

                                className="form-control"

                                placeholder="Email"

                                name="email"

                                value={form.email}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="input-group mb-4">

                            <span className="input-group-text">

                                <FaLock/>

                            </span>

                            <input

                                type={
                                    showPassword
                                    ? "text"
                                    : "password"
                                }

                                className="form-control"

                                placeholder="Password"

                                name="password"

                                value={form.password}

                                onChange={handleChange}

                            />

                            <button

                                className="btn btn-outline-secondary"

                                onClick={()=>

                                    setShowPassword(
                                        !showPassword
                                    )

                                }

                            >

                                {

                                    showPassword ?

                                    <FaEyeSlash/>

                                    :

                                    <FaEye/>

                                }

                            </button>

                        </div>

                        <button

                            className="btn btn-success w-100"

                            onClick={register}

                            disabled={loading}

                        >

                            {

                                loading ?

                                "Creating Account..."

                                :

                                "Create Account"

                            }

                        </button>

                        <div className="text-center mt-4">

                            <Link to="/login">

                                Already have an account?

                                Login

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}