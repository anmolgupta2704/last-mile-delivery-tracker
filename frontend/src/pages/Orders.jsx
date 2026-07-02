import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
    FaEye,
    FaSearch,
    FaCopy,
    FaBoxOpen
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const res = await API.get("/orders");

            setOrders(res.data.orders || []);

        } catch (err) {

            console.log(err);

        }

    };

    const filteredOrders = useMemo(() => {

        return orders.filter(order =>
            order._id.toLowerCase().includes(search.toLowerCase())
        );

    }, [orders, search]);

    const copyId = (id) => {

        navigator.clipboard.writeText(id);

        toast.success("Order ID Copied");

    };

    const badge = (status) => {

        switch (status) {

            case "Delivered":
                return "success";

            case "Assigned":
                return "primary";

            case "Created":
                return "secondary";

            case "Failed":
                return "danger";

            case "Rescheduled":
                return "warning";

            default:
                return "dark";

        }

    };

    return (

        <div className="card border-0 shadow-lg">

            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">

                <h4 className="mb-0">

                    <FaBoxOpen className="me-2"/>

                    My Orders

                </h4>

                <div className="input-group" style={{width:"280px"}}>

                    <span className="input-group-text">

                        <FaSearch/>

                    </span>

                    <input
                        className="form-control"
                        placeholder="Search Order ID..."
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />

                </div>

            </div>

            <div className="card-body">

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

                        <thead className="table-primary">

                            <tr>

                                <th>Order ID</th>

                                <th>Status</th>

                                <th>Charge</th>

                                <th>Payment</th>

                                <th>Created</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredOrders.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center py-5"
                                        >

                                            No Orders Found

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    filteredOrders.map(order => (

                                        <tr key={order._id}>

                                            <td>

                                                <strong>

                                                    {order._id.slice(-8)}

                                                </strong>

                                                <button

                                                    className="btn btn-sm"

                                                    onClick={()=>copyId(order._id)}

                                                >

                                                    <FaCopy/>

                                                </button>

                                            </td>

                                            <td>

                                                <span className={`badge bg-${badge(order.status)}`}>

                                                    {order.status}

                                                </span>

                                            </td>

                                            <td>

                                                ₹ {order.deliveryCharge}

                                            </td>

                                            <td>

                                                {order.paymentType}

                                            </td>

                                            <td>

                                                {

                                                    new Date(order.createdAt)

                                                    .toLocaleDateString()

                                                }

                                            </td>

                                            <td>

                                                <button

                                                    className="btn btn-primary btn-sm"

                                                    onClick={()=>navigate(`/orders/${order._id}`)}

                                                >

                                                    <FaEye className="me-2"/>

                                                    View

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}