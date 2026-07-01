import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function AnalyticsChart({ analytics }) {

    const data = {
        labels: analytics.map(a => a._id),
        datasets: [
            {
                label: "Orders",
                data: analytics.map(a => a.total)
            }
        ]
    };

    return (
        <div className="card mt-4 p-3">
            <h4>Order Analytics</h4>

            <Bar data={data} />
        </div>
    );

}