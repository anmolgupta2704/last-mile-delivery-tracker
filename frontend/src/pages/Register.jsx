import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const register = async () => {

        try {

            await API.post("/auth/register", form);

            toast.success("Registration Successful");

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (err) {

            toast.error(
                err.response?.data?.message || "Registration Failed"
            );

        }

    };

    return (
        <>
            <Toaster />

            <div className="container vh-100 d-flex justify-content-center align-items-center">

                <div className="card shadow p-4" style={{ width: "420px" }}>

                    <h2 className="text-center mb-4">Create Account</h2>

                    <input
                        className="form-control mb-3"
                        placeholder="Name"
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Email"
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                    />

                    <button
                        className="btn btn-success"
                        onClick={register}
                    >
                        Register
                    </button>

                    <Link
                        className="mt-3 text-center"
                        to="/"
                    >
                        Already have an account?
                    </Link>

                </div>

            </div>
        </>
    );
}