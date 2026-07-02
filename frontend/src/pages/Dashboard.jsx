import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import Statistics from "../components/Statistics";
import CreateOrder from "./CreateOrder";
import Orders from "./Orders";
import {
    FaTruck,
    FaClipboardList,
    FaShippingFast,
    FaCheckCircle
} from "react-icons/fa";

export default function Dashboard() {

    return (
        <>
            <Navbar />

            <div className="container-fluid bg-light min-vh-100 py-4">

                {/* Welcome Banner */}
                <div
                    className="card border-0 shadow-lg text-white mb-4"
                    style={{
                        borderRadius: "20px",
                        background:
                            "linear-gradient(135deg,#2563eb,#1e40af)"
                    }}
                >
                    <div className="card-body p-4">

                        <h2 className="fw-bold">
                            👋 Welcome to Last Mile Delivery
                        </h2>

                        <p className="mb-0">
                            Manage orders, track deliveries and monitor logistics
                            from one dashboard.
                        </p>

                    </div>
                </div>

                {/* Quick Stats */}

                <div className="row g-4 mb-4">

                    <div className="col-md-3">

                        <div className="card border-0 shadow h-100">

                            <div className="card-body text-center">

                                <FaClipboardList
                                    size={40}
                                    className="text-primary mb-3"
                                />

                                <h5>Total Orders</h5>

                                <h3 className="fw-bold">
                                    --
                                </h3>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card border-0 shadow h-100">

                            <div className="card-body text-center">

                                <FaShippingFast
                                    size={40}
                                    className="text-warning mb-3"
                                />

                                <h5>In Transit</h5>

                                <h3 className="fw-bold">
                                    --
                                </h3>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card border-0 shadow h-100">

                            <div className="card-body text-center">

                                <FaCheckCircle
                                    size={40}
                                    className="text-success mb-3"
                                />

                                <h5>Delivered</h5>

                                <h3 className="fw-bold">
                                    --
                                </h3>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card border-0 shadow h-100">

                            <div className="card-body text-center">

                                <FaTruck
                                    size={40}
                                    className="text-danger mb-3"
                                />

                                <h5>Active Deliveries</h5>

                                <h3 className="fw-bold">
                                    --
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Profile */}

                <ProfileCard />

                <div className="my-4">

                    <Statistics />

                </div>

                {/* Create Order */}

                <div
                    className="card border-0 shadow-lg mb-4"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-header bg-primary text-white">

                        <h4 className="mb-0">
                            📦 Create New Order
                        </h4>

                    </div>

                    <div className="card-body">

                        <CreateOrder />

                    </div>

                </div>

                {/* Orders */}

                <div
                    className="card border-0 shadow-lg"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-header bg-dark text-white">

                        <h4 className="mb-0">
                            📋 My Orders
                        </h4>

                    </div>

                    <div className="card-body">

                        <Orders />

                    </div>

                </div>

            </div>
            <Footer/>
        </>
    );
}