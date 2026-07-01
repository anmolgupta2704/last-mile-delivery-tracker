import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import AdminOrders from "../components/AdminOrders";
import AnalyticsChart from "../components/AnalyticsChart";
import RevenueChart from "../components/RevenueChart";

export default function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [analytics, setAnalytics] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const dashboardRes = await API.get("/admin/dashboard");
            setDashboard(dashboardRes.data.dashboard);

            const analyticsRes = await API.get("/admin/analytics");
            setAnalytics(analyticsRes.data.analytics);

            const revenueRes = await API.get("/admin/revenue");
            setRevenue(revenueRes.data.revenue);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <h2 className="text-center mt-5">
                Loading Dashboard...
            </h2>
        );

    }

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <div className="row">

                    <DashboardCard
                        title="Total Orders"
                        value={dashboard?.totalOrders || 0}
                        color="primary"
                    />

                    <DashboardCard
                        title="Delivered"
                        value={dashboard?.delivered || 0}
                        color="success"
                    />

                    <DashboardCard
                        title="Pending"
                        value={dashboard?.pending || 0}
                        color="warning"
                    />

                    <DashboardCard
                        title="Revenue"
                        value={`₹${dashboard?.revenue || 0}`}
                        color="dark"
                    />

                </div>

                <hr />

                <AdminOrders />

                <div className="row mt-4">

                    <div className="col-md-6">

                        <AnalyticsChart
                            analytics={analytics}
                        />

                    </div>

                    <div className="col-md-6">

                        <RevenueChart
                            revenue={revenue}
                        />

                    </div>

                </div>

            </div>

        </>

    );

}