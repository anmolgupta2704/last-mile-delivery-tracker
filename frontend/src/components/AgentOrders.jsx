import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function AgentOrders() {

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

            toast.success("Status Updated");

            loadOrders();

        }

        catch (err) {

            toast.error(

                err.response?.data?.message || "Failed"

            );

        }

    };

    return (

        <table className="table table-bordered mt-4">

            <thead className="table-dark">

                <tr>

                    <th>Customer</th>

                    <th>Status</th>

                    <th>Update</th>

                </tr>

            </thead>

            <tbody>

                {

                    orders.map(order=>(

                        <tr key={order._id}>

                            <td>{order.customer?.name}</td>

                            <td>{order.status}</td>

                            <td>

                                <select

                                    className="form-select"

                                    defaultValue={order.status}

                                    onChange={(e)=>{

                                        updateStatus(

                                            order._id,

                                            e.target.value

                                        );

                                    }}

                                >

                                    <option>Assigned</option>

                                    <option>Picked Up</option>

                                    <option>In Transit</option>

                                    <option>Out For Delivery</option>

                                    <option>Delivered</option>

                                    <option>Failed</option>

                                </select>

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}