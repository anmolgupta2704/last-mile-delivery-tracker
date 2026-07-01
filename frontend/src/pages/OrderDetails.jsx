import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import API from "../api/axios";
import Progress from "../components/Progress";
import TrackingTimeline from "../components/TrackingTimeline";

const socket = io("http://localhost:5000");

export default function OrderDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    useEffect(() => {

        loadOrder();

        socket.emit("join-order", id);

        socket.on("status-update", (data) => {

            if (data.orderId === id) {

                loadOrder();

            }

        });

        return () => {

            socket.off("status-update");

        };

    }, [id]);

    const loadOrder = async () => {

        try {

            const res = await API.get(`/orders/${id}`);

            setOrder(res.data.order || res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!order) {

        return (

            <div className="container mt-5">

                <h3 className="text-center">

                    Loading...

                </h3>

            </div>

        );

    }

    return (

        <div className="container mt-4">

            <div className="card shadow p-4">

                <h2>Order Details</h2>

                <hr />

                <Progress status={order.status} />

                <hr />

                <div className="row">

                    <div className="col-md-6">

                        <h5>
                            <b>Status :</b> {order.status}
                        </h5>

                        <h5>
                            <b>Charge :</b> ₹{order.deliveryCharge}
                        </h5>

                        <h5>
                            <b>Payment :</b> {order.paymentType}
                        </h5>

                    </div>

                    <div className="col-md-6">

                        <h5>
                            <b>Agent :</b>{" "}
                            {order.agent?.name || "Not Assigned"}
                        </h5>

                        <h5>
                            <b>Pickup :</b>{" "}
                            {order.pickupAddress}
                        </h5>

                        <h5>
                            <b>Drop :</b>{" "}
                            {order.dropAddress}
                        </h5>

                    </div>

                </div>

                <hr />

                <TrackingTimeline
                    tracking={order.trackingHistory}
                />

                {

                    order.status === "Failed" && (

                        <button

                            className="btn btn-danger mt-4"

                            onClick={() =>

                                navigate(`/reschedule/${order._id}`)

                            }

                        >

                            Reschedule Delivery

                        </button>

                    )

                }

            </div>

        </div>

    );

}