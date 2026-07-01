import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
export default function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

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

}
else if (res.data.role === "agent") {

    navigate("/agent");

}
else {

    navigate("/dashboard");

}

            }, 1000);

        }

        catch (err) {

            toast.error(
                err.response?.data?.message || "Login Failed"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>

        <Toaster/>

        <div className="container vh-100 d-flex justify-content-center align-items-center">

            <div
                className="card shadow p-4"
                style={{width:"400px"}}
            >

                <h2 className="text-center mb-4">
                    Last Mile Delivery
                </h2>

                <input

                    className="form-control mb-3"

                    placeholder="Email"

                    onChange={(e)=>setForm({

                        ...form,

                        email:e.target.value

                    })}

                />

                <input

                    type="password"

                    className="form-control mb-3"

                    placeholder="Password"

                    onChange={(e)=>setForm({

                        ...form,

                        password:e.target.value

                    })}

                />

                <button

                    className="btn btn-primary"

                    onClick={login}

                    disabled={loading}

                >

                    {

                        loading ?

                        "Logging In..."

                        :

                        "Login"

                    }

                </button>
                 <div className="text-center mt-3">
    <Link to="/register">
        Create New Account
    </Link>
</div>
            </div>

        </div>

        </>

    );

}