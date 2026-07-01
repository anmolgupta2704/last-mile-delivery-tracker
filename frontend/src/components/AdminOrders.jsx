import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        const url = status
            ? `/admin/orders?status=${status}`
            : "/admin/orders";

        const res = await API.get(url);

        setOrders(res.data.orders);
    };

    const autoAssign = async (id) => {

        try {

            await API.post(`/admin/auto/${id}`);

            toast.success("Agent Assigned");

            loadOrders();

        } catch (err) {

            toast.error(err.response?.data?.message || "Failed");

        }

    };

    const overrideStatus = async (id, status) => {

        try {

            await API.patch(`/admin/override/${id}`, {
                status
            });

            toast.success("Status Updated");

            loadOrders();

        } catch (err) {

            toast.error(err.response?.data?.message || "Failed");

        }

    };

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">

                <h3>All Orders</h3>

                <select
                    className="form-select w-25"
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value);
                    }}
                >
                    <option value="">All</option>
                    <option value="Created">Created</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Failed">Failed</option>
                </select>

                <button
                    className="btn btn-primary"
                    onClick={loadOrders}
                >
                    Apply
                </button>

            </div>

            <table className="table table-striped">

                <thead>

                    <tr>

                        <th>Customer</th>

                        <th>Status</th>

                        <th>Charge</th>

                        <th>Agent</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        orders.map((order) => (

                            <tr key={order._id}>

                                <td>{order.customer?.name}</td>

                                <td>{order.status}</td>

                                <td>₹{order.deliveryCharge}</td>

                                <td>

                                    {order.agent?.name || "Not Assigned"}

                                </td>

                                <td>

                                    <button
                                        className="btn btn-success btn-sm me-2"
                                        onClick={() =>
                                            autoAssign(order._id)
                                        }
                                    >
                                        Auto Assign
                                    </button>

                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() =>
                                            overrideStatus(
                                                order._id,
                                                "Delivered"
                                            )
                                        }
                                    >
                                        Mark Delivered
                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}