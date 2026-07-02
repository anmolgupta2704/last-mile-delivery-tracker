import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Progress from "../components/Progress";
import TrackingTimeline from "../components/TrackingTimeline";
import {
    FaBox,
    FaUser,
    FaTruck,
    FaMapMarkerAlt,
    FaMoneyBillWave
} from "react-icons/fa";

const socket = io("http://localhost:5000");

export default function OrderDetails() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {

        loadOrder();

        socket.emit("join-order", id);

        socket.on("status-update", () => {
            loadOrder();
        });

        return () => socket.off("status-update");

    }, []);

    const loadOrder = async () => {

        try {

            const res = await API.get(`/orders/${id}`);

            setOrder(res.data.order);

        } catch (err) {

            console.log(err);

        }

    };

    if (!order)
        return <h2 className="text-center mt-5">Loading...</h2>;

    return (

        <>
            <Navbar/>

            <div className="container my-4">

                {/* Header */}

                <div className="card shadow border-0 mb-4">

                    <div className="card-body d-flex justify-content-between align-items-center">

                        <div>

                            <h3>

                                <FaBox className="me-2"/>

                                Order #{order._id.slice(-8)}

                            </h3>

                            <small className="text-muted">

                                Created on {" "}

                                {new Date(order.createdAt).toLocaleString()}

                            </small>

                        </div>

                        <span className="badge bg-primary fs-6">

                            {order.status}

                        </span>

                    </div>

                </div>

                {/* Progress */}

                <div className="card shadow border-0 mb-4">

                    <div className="card-body">

                        <h5>Delivery Progress</h5>

                        <Progress status={order.status}/>

                    </div>

                </div>

                <div className="row">

                    {/* Left */}

                    <div className="col-lg-8">

                        <div className="card shadow border-0 mb-4">

                            <div className="card-header bg-primary text-white">

                                <FaMapMarkerAlt className="me-2"/>

                                Address Details

                            </div>

                            <div className="card-body">

                                <p>

                                    <strong>Pickup :</strong>

                                    <br/>

                                    {order.pickupAddress}

                                </p>

                                <hr/>

                                <p>

                                    <strong>Drop :</strong>

                                    <br/>

                                    {order.dropAddress}

                                </p>

                            </div>

                        </div>

                        <div className="card shadow border-0">

                            <div className="card-header bg-success text-white">

                                Tracking Timeline

                            </div>

                            <div className="card-body">

                                <TrackingTimeline
                                    tracking={order.trackingHistory}
                                />

                            </div>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="col-lg-4">

                        <div className="card shadow border-0 mb-3">

                            <div className="card-body">

                                <h5>

                                    <FaTruck className="me-2"/>

                                    Delivery

                                </h5>

                                <hr/>

                                <p>

                                    <strong>Payment</strong>

                                    <br/>

                                    {order.paymentType}

                                </p>

                                <p>

                                    <strong>Order Type</strong>

                                    <br/>

                                    {order.orderType}

                                </p>

                                <p>

                                    <strong>Status</strong>

                                    <br/>

                                    {order.status}

                                </p>

                            </div>

                        </div>

                        <div className="card shadow border-0 mb-3">

                            <div className="card-body">

                                <h5>

                                    <FaMoneyBillWave className="me-2"/>

                                    Charges

                                </h5>

                                <hr/>

                                <h3 className="text-success">

                                    ₹ {order.deliveryCharge}

                                </h3>

                                <small>

                                    Chargeable Weight

                                    <br/>

                                    {order.chargeableWeight} Kg

                                </small>

                            </div>

                        </div>

                        <div className="card shadow border-0">

                            <div className="card-body">

                                <h5>

                                    <FaUser className="me-2"/>

                                    Agent

                                </h5>

                                <hr/>

                                {

                                    order.agent ?

                                    <>

                                        <h6>{order.agent.name}</h6>

                                        <p>{order.agent.email}</p>

                                    </>

                                    :

                                    <p className="text-danger">

                                        Not Assigned

                                    </p>

                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}