import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import StatusBadge from "../components/StatusBadge";

export default function Orders() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const res = await API.get("/orders");

            setOrders(res.data.orders || res.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="container mt-5 text-center">

                <h4>Loading Orders...</h4>

            </div>

        );

    }

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2>My Orders</h2>

                <button
                    className="btn btn-success"
                    onClick={fetchOrders}
                >
                    Refresh
                </button>

            </div>

            <table className="table table-striped table-bordered table-hover shadow">

                <thead className="table-dark">

                    <tr>

                        <th>Order ID</th>

                        <th>Status</th>

                        <th>Charge</th>

                        <th>Payment</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        orders.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="text-center"
                                >

                                    No Orders Found

                                </td>

                            </tr>

                        )

                        :

                        (

                            orders.map((order) => (

                                <tr key={order._id}>

                                    <td>

                                        {order._id.slice(-8)}

                                    </td>

                                    <td>

                                        <StatusBadge
                                            status={order.status}
                                        />

                                    </td>

                                    <td>

                                        ₹ {order.deliveryCharge}

                                    </td>

                                    <td>

                                        {order.paymentType}

                                    </td>

                                    <td>

                                        <button

                                            className="btn btn-primary btn-sm"

                                            onClick={() =>

                                                navigate(`/orders/${order._id}`)

                                            }

                                        >

                                            View Details

                                        </button>

                                    </td>

                                </tr>

                            ))

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}