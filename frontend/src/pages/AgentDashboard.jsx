import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import {
    FaTruck,
    FaCheckCircle,
    FaClock,
    FaMapMarkedAlt,
    FaBoxOpen
} from "react-icons/fa";

export default function AgentDashboard() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const res = await API.get("/agent/orders");

            setOrders(res.data.orders || res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const updateStatus = async (id, status) => {

        try {

            await API.patch(`/agent/status/${id}`, {
                status
            });

            loadOrders();

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <>
            <Navbar />

            <div className="container-fluid bg-light min-vh-100 py-4">

                <div
                    className="card border-0 shadow-lg mb-4 text-white"
                    style={{
                        background:
                            "linear-gradient(135deg,#0f766e,#14b8a6)",
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body">

                        <h2>

                            🚚 Agent Dashboard

                        </h2>

                        <p>

                            Manage today's assigned deliveries.

                        </p>

                    </div>

                </div>

                <div className="row g-4 mb-4">

                    <div className="col-md-3">

                        <div className="card shadow border-0 text-center">

                            <div className="card-body">

                                <FaBoxOpen
                                    size={40}
                                    className="text-primary mb-2"
                                />

                                <h5>Total Assigned</h5>

                                <h3>{orders.length}</h3>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0 text-center">

                            <div className="card-body">

                                <FaTruck
                                    size={40}
                                    className="text-warning mb-2"
                                />

                                <h5>In Transit</h5>

                                <h3>

                                    {
                                        orders.filter(
                                            o => o.status === "In Transit"
                                        ).length
                                    }

                                </h3>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0 text-center">

                            <div className="card-body">

                                <FaCheckCircle
                                    size={40}
                                    className="text-success mb-2"
                                />

                                <h5>Delivered</h5>

                                <h3>

                                    {
                                        orders.filter(
                                            o => o.status === "Delivered"
                                        ).length
                                    }

                                </h3>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow border-0 text-center">

                            <div className="card-body">

                                <FaClock
                                    size={40}
                                    className="text-danger mb-2"
                                />

                                <h5>Pending</h5>

                                <h3>

                                    {
                                        orders.filter(
                                            o => o.status !== "Delivered"
                                        ).length
                                    }

                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow border-0">

                    <div className="card-header bg-dark text-white">

                        Assigned Orders

                    </div>

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover">

                                <thead className="table-primary">

                                    <tr>

                                        <th>Order</th>

                                        <th>Pickup</th>

                                        <th>Drop</th>

                                        <th>Status</th>

                                        <th>Update</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        orders.map(order => (

                                            <tr key={order._id}>

                                                <td>

                                                    {order._id.slice(-8)}

                                                </td>

                                                <td>

                                                    <FaMapMarkedAlt />

                                                    {" "}

                                                    {order.pickupAddress}

                                                </td>

                                                <td>

                                                    {order.dropAddress}

                                                </td>

                                                <td>

                                                    <span className="badge bg-primary">

                                                        {order.status}

                                                    </span>

                                                </td>

                                                <td>

                                                    <select
                                                        className="form-select"
                                                        value={order.status}
                                                        onChange={(e)=>

                                                            updateStatus(
                                                                order._id,
                                                                e.target.value
                                                            )

                                                        }
                                                    >

                                                        <option>

                                                            Assigned

                                                        </option>

                                                        <option>

                                                            Picked Up

                                                        </option>

                                                        <option>

                                                            In Transit

                                                        </option>

                                                        <option>

                                                            Out For Delivery

                                                        </option>

                                                        <option>

                                                            Delivered

                                                        </option>

                                                    </select>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}