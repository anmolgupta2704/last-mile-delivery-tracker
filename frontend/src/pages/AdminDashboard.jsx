import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import AdminOrders from "../components/AdminOrders";
import AnalyticsChart from "../components/AnalyticsChart";
import RevenueChart from "../components/RevenueChart";

import {
    FaClipboardList,
    FaCheckCircle,
    FaMoneyBillWave,
    FaTruckMoving
} from "react-icons/fa";

export default function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [analytics, setAnalytics] = useState([]);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const dashboardRes =
                await API.get("/admin/dashboard");

            const analyticsRes =
                await API.get("/admin/analytics");

            const revenueRes =
                await API.get("/admin/revenue");

            setDashboard(dashboardRes.data.dashboard);

            setAnalytics(analyticsRes.data.analytics);

            setRevenue(revenueRes.data.revenue);

        } catch (err) {

            console.log(err);

        }

    };

    if (!dashboard)
        return <h2 className="text-center mt-5">Loading...</h2>;

    return (

        <>
            <Navbar/>

            <div className="container-fluid bg-light min-vh-100 py-4">

                <div
                    className="card border-0 shadow-lg mb-4"
                    style={{
                        background:
                        "linear-gradient(135deg,#1e40af,#2563eb)",
                        color:"white",
                        borderRadius:"18px"
                    }}
                >

                    <div className="card-body">

                        <h2>

                            👨‍💼 Admin Dashboard

                        </h2>

                        <p>

                            Monitor deliveries, revenue,
                            agents and orders in real time.

                        </p>

                    </div>

                </div>

                <div className="row g-4">

                    <DashboardCard
                        title="Total Orders"
                        value={dashboard.totalOrders}
                        color="primary"
                        icon={<FaClipboardList size={28}/>}
                    />

                    <DashboardCard
                        title="Delivered"
                        value={dashboard.delivered}
                        color="success"
                        icon={<FaCheckCircle size={28}/>}
                    />

                    <DashboardCard
                        title="Revenue"
                        value={`₹ ${dashboard.revenue}`}
                        color="dark"
                        icon={<FaMoneyBillWave size={28}/>}
                    />

                    <DashboardCard
                        title="Pending"
                        value={dashboard.pending}
                        color="warning"
                        icon={<FaTruckMoving size={28}/>}
                    />

                </div>

                <div className="row mt-4">

                    <div className="col-lg-6">

                        <div className="card shadow border-0">

                            <div className="card-header bg-primary text-white">

                                📊 Order Analytics

                            </div>

                            <div className="card-body">

                                <AnalyticsChart analytics={analytics}/>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-6">

                        <div className="card shadow border-0">

                            <div className="card-header bg-success text-white">

                                💰 Revenue

                            </div>

                            <div className="card-body">

                                <RevenueChart revenue={revenue}/>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-4">

                    <AdminOrders/>

                </div>

            </div>

        </>

    );

}