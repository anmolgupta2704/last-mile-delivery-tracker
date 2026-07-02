import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
    FaTruck,
    FaEye,
    FaEyeSlash,
    FaUserShield,
    FaUserTie,
    FaUser
} from "react-icons/fa";

export default function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const demoLogin = (role) => {

        if (role === "admin") {

            setForm({
                email: "admin@gmail.com",
                password: "123456"
            });

        } else if (role === "agent") {

            setForm({
                email: "agent@gmail.com",
                password: "123456"
            });

        } else {

            setForm({
                email: "customer@gmail.com",
                password: "123456"
            });

        }

    };

    const login = async () => {

        try {

            setLoading(true);

            const res = await API.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            toast.success("Login Successful");

            setTimeout(() => {

                if (res.data.role === "admin") {

                    navigate("/admin");

                } else if (res.data.role === "agent") {

                    navigate("/agent");

                } else {

                    navigate("/dashboard");

                }

            }, 800);

        } catch (err) {

            toast.error(
                err.response?.data?.message || "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <>
            <Toaster />

            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    minHeight: "100vh",
                    background:
                        "linear-gradient(135deg,#2563eb,#1e3a8a)"
                }}
            >

                <div
                    className="card border-0 shadow-lg p-4"
                    style={{
                        width: "430px",
                        borderRadius: "20px"
                    }}
                >

                    <div className="text-center">

                        <FaTruck
                            size={55}
                            color="#2563eb"
                        />

                        <h2 className="fw-bold mt-3" style={{ color: "black" }}>

                            Last Mile Delivery

                        </h2>

                        <p className="text-muted">

                            Logistics Management System

                        </p>

                    </div>

                    <input

                        className="form-control mb-3"

                        placeholder="Email"

                        value={form.email}

                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value
                            })
                        }

                    />

                    <div className="input-group mb-3">

                        <input

                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }

                            className="form-control"

                            placeholder="Password"

                            value={form.password}

                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value
                                })
                            }

                        />

                        <button

                            className="btn btn-outline-secondary"

                            onClick={() =>
                                setShowPassword(!showPassword)
                            }

                        >

                            {
                                showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }

                        </button>

                    </div>

                    <button

                        className="btn btn-primary w-100"

                        onClick={login}

                        disabled={loading}

                    >

                        {
                            loading
                                ? "Logging In..."
                                : "Login"
                        }

                    </button>

                    <div className="text-center mt-3">

                        <Link to="/register">

                            Create New Account

                        </Link>

                    </div>

                    <hr />

                    <h5 className="text-center">

                        Demo Accounts

                    </h5>

                    <div className="border rounded p-3 mt-2">

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <div>

                                <FaUserShield color="#2563eb" />

                                {" "}Admin

                            </div>

                            <button

                                className="btn btn-sm btn-primary"

                                onClick={() => demoLogin("admin")}

                            >

                                Use

                            </button>

                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <div>

                                <FaUserTie color="#198754" />

                                {" "}Agent

                            </div>

                            <button

                                className="btn btn-sm btn-success"

                                onClick={() => demoLogin("agent")}

                            >

                                Use

                            </button>

                        </div>

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <FaUser color="#fd7e14" />

                                {" "}Customer

                            </div>

                            <button

                                className="btn btn-sm btn-warning"

                                onClick={() => demoLogin("customer")}

                            >

                                Use

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}