import Navbar from "../components/Navbar";
import AgentOrders from "../components/AgentOrders";

export default function AgentDashboard() {

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Agent Dashboard</h2>

                <AgentOrders />

            </div>

        </>

    );

}