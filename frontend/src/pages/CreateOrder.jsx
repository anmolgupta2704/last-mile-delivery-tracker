import { useState } from "react";
import API from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import {
    FaMapMarkerAlt,
    FaBoxOpen,
    FaMoneyBillWave,
    FaTruck
} from "react-icons/fa";

export default function CreateOrder() {

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        pickupAddress: "",
        dropAddress: "",
        length: "",
        breadth: "",
        height: "",
        actualWeight: "",
        paymentType: "Prepaid",
        orderType: "B2C"
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const createOrder = async () => {

        try {

            setLoading(true);

            await API.post("/orders", form);

            toast.success("Order Created Successfully");

            setForm({
                pickupAddress: "",
                dropAddress: "",
                length: "",
                breadth: "",
                height: "",
                actualWeight: "",
                paymentType: "Prepaid",
                orderType: "B2C"
            });

        } catch (err) {

            toast.error(
                err.response?.data?.message || "Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <>
            <Toaster />

            <div className="row">

                {/* Address */}

                <div className="col-md-6">

                    <div className="card shadow border-0 h-100">

                        <div className="card-header bg-primary text-white">

                            <FaMapMarkerAlt className="me-2"/>

                            Address Details

                        </div>

                        <div className="card-body">

                            <input
                                className="form-control mb-3"
                                placeholder="Pickup Address"
                                name="pickupAddress"
                                value={form.pickupAddress}
                                onChange={handleChange}
                            />

                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Drop Address"
                                name="dropAddress"
                                value={form.dropAddress}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </div>

                {/* Package */}

                <div className="col-md-6">

                    <div className="card shadow border-0 h-100">

                        <div className="card-header bg-success text-white">

                            <FaBoxOpen className="me-2"/>

                            Package Details

                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col">

                                    <input
                                        type="number"
                                        className="form-control mb-3"
                                        placeholder="Length"
                                        name="length"
                                        value={form.length}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col">

                                    <input
                                        type="number"
                                        className="form-control mb-3"
                                        placeholder="Breadth"
                                        name="breadth"
                                        value={form.breadth}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className="row">

                                <div className="col">

                                    <input
                                        type="number"
                                        className="form-control mb-3"
                                        placeholder="Height"
                                        name="height"
                                        value={form.height}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col">

                                    <input
                                        type="number"
                                        className="form-control mb-3"
                                        placeholder="Weight (Kg)"
                                        name="actualWeight"
                                        value={form.actualWeight}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row mt-4">

                <div className="col-md-6">

                    <div className="card border-0 shadow">

                        <div className="card-header bg-warning">

                            <FaMoneyBillWave className="me-2"/>

                            Payment

                        </div>

                        <div className="card-body">

                            <select
                                className="form-select"
                                name="paymentType"
                                value={form.paymentType}
                                onChange={handleChange}
                            >

                                <option value="Prepaid">
                                    Prepaid
                                </option>

                                <option value="COD">
                                    Cash On Delivery
                                </option>

                            </select>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card border-0 shadow">

                        <div className="card-header bg-info text-white">

                            <FaTruck className="me-2"/>

                            Order Type

                        </div>

                        <div className="card-body">

                            <select
                                className="form-select"
                                name="orderType"
                                value={form.orderType}
                                onChange={handleChange}
                            >

                                <option value="B2C">
                                    B2C
                                </option>

                                <option value="B2B">
                                    B2B
                                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>

            <div className="text-center mt-4">

                <button
                    className="btn btn-lg btn-primary px-5"
                    onClick={createOrder}
                    disabled={loading}
                >

                    {
                        loading
                            ? "Creating..."
                            : "🚚 Create Order"
                    }

                </button>

            </div>

        </>

    );

}