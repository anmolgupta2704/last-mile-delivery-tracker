import { useState } from "react";
import API from "../api/axios";
import toast, { Toaster } from "react-hot-toast";

export default function CreateOrder() {

    const [form, setForm] = useState({
        pickupAddress: "",
        dropAddress: "",
        pickupZone: "",
        dropZone: "",
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

            const res = await API.post("/orders", form);

            toast.success("Order Created Successfully");

            console.log(res.data);

            setForm({
                pickupAddress: "",
                dropAddress: "",
                pickupZone: "",
                dropZone: "",
                length: "",
                breadth: "",
                height: "",
                actualWeight: "",
                paymentType: "Prepaid",
                orderType: "B2C"
            });

        } catch (err) {

            console.log(err.response);

            toast.error(
                err.response?.data?.message || "Order Creation Failed"
            );

        }

    };

    return (
        <>
            <Toaster />

            <div className="container mt-5">

                <div className="card shadow p-4">

                    <h2 className="text-center mb-4">
                        Create Order
                    </h2>

                    <input
                        className="form-control mb-3"
                        placeholder="Pickup Address"
                        name="pickupAddress"
                        value={form.pickupAddress}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Drop Address"
                        name="dropAddress"
                        value={form.dropAddress}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Pickup Zone"
                        name="pickupZone"
                        value={form.pickupZone}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Drop Zone"
                        name="dropZone"
                        value={form.dropZone}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Length"
                        type="number"
                        name="length"
                        value={form.length}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Breadth"
                        type="number"
                        name="breadth"
                        value={form.breadth}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Height"
                        type="number"
                        name="height"
                        value={form.height}
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Actual Weight"
                        type="number"
                        name="actualWeight"
                        value={form.actualWeight}
                        onChange={handleChange}
                    />

                    <select
                        className="form-select mb-3"
                        name="paymentType"
                        value={form.paymentType}
                        onChange={handleChange}
                    >
                        <option value="Prepaid">Prepaid</option>
                        <option value="COD">COD</option>
                    </select>

                    <select
                        className="form-select mb-3"
                        name="orderType"
                        value={form.orderType}
                        onChange={handleChange}
                    >
                        <option value="B2C">B2C</option>
                        <option value="B2B">B2B</option>
                    </select>

                    <button
                        className="btn btn-success w-100"
                        onClick={createOrder}
                    >
                        Create Order
                    </button>

                </div>

            </div>

        </>
    );

}