import { Link } from "react-router-dom";
import { FaTruck, FaMapMarkedAlt, FaChartLine, FaUserShield } from "react-icons/fa";

export default function Home() {
    return (
        <div
            className="min-vh-100 d-flex align-items-center"
            style={{
                background: "linear-gradient(135deg,#2563eb,#1e3a8a)"
            }}
        >
            <div className="container">

                <div className="row align-items-center">

                    <div className="col-lg-6 text-white">

                        <h1 className="display-4 fw-bold">
                            Last Mile Delivery Tracker
                        </h1>

                        <p className="lead mt-4">
                            Track deliveries, manage agents,
                            calculate delivery charges and monitor
                            logistics in real time.
                        </p>

                        <div className="mt-4">

                            <Link
                                to="/login"
                                className="btn btn-light btn-lg me-3"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-outline-light btn-lg"
                            >
                                Register
                            </Link>

                        </div>

                    </div>

                    <div className="col-lg-6">

                        <div className="card shadow-lg border-0 p-4">

                            <h3 className="text-center mb-4">
                                Features
                            </h3>

                            <div className="mb-3">
                                <FaTruck className="text-primary me-2"/>
                                Live Order Tracking
                            </div>

                            <div className="mb-3">
                                <FaMapMarkedAlt className="text-success me-2"/>
                                Automatic Zone Detection
                            </div>

                            <div className="mb-3">
                                <FaChartLine className="text-warning me-2"/>
                                Revenue Analytics
                            </div>

                            <div>
                                <FaUserShield className="text-danger me-2"/>
                                Admin & Agent Management
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}