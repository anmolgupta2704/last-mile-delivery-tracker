import { Link } from "react-router-dom";

export default function Navbar() {

    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link className="navbar-brand" to="/dashboard">
                    Last Mile Delivery
                </Link>

                <div className="navbar-nav ms-auto">

                    {role === "customer" && (
                        <>
                            <Link className="nav-link" to="/dashboard">
                                Dashboard
                            </Link>
                        </>
                    )}

                    {role === "admin" && (
                        <>
                            <Link className="nav-link" to="/admin">
                                Admin Dashboard
                            </Link>
                        </>
                    )}

                    {role === "agent" && (
                        <>
                            <Link className="nav-link" to="/agent">
                                Agent Dashboard
                            </Link>
                        </>
                    )}

                    <button
                        className="btn btn-danger ms-3"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}