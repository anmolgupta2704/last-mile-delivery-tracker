import { Link, useNavigate } from "react-router-dom";
import {
    FaTruck,
    FaHome,
    FaBox,
    FaUserShield,
    FaMotorcycle,
    FaSignOutAlt
} from "react-icons/fa";

export default function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">

            <div className="container">

                <Link className="navbar-brand fw-bold fs-4" to="/dashboard">

                    <FaTruck className="me-2"/>

                    Last Mile Delivery

                </Link>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navMenu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navMenu"
                >

                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item">

                            <Link className="nav-link" to="/dashboard">

                                <FaHome className="me-1"/>

                                Dashboard

                            </Link>

                        </li>

                        {
                            role === "customer" &&

                            <li className="nav-item">

                                <Link className="nav-link" to="/dashboard">

                                    <FaBox className="me-1"/>

                                    My Orders

                                </Link>

                            </li>

                        }

                        {
                            role === "admin" &&

                            <li className="nav-item">

                                <Link className="nav-link" to="/admin">

                                    <FaUserShield className="me-1"/>

                                    Admin

                                </Link>

                            </li>

                        }

                        {
                            role === "agent" &&

                            <li className="nav-item">

                                <Link className="nav-link" to="/agent">

                                    <FaMotorcycle className="me-1"/>

                                    Agent

                                </Link>

                            </li>

                        }

                        <li className="nav-item ms-3">

                            <button
                                className="btn btn-danger"
                                onClick={logout}
                            >

                                <FaSignOutAlt className="me-2"/>

                                Logout

                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}