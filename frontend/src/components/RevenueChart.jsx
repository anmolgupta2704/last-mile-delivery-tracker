import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function RevenueChart({ revenue }) {

    return (

        <div className="card mt-4 p-3">

            <h4>Total Revenue</h4>

            <Doughnut

                data={{

                    labels:["Revenue"],

                    datasets:[

                        {

                            data:[revenue]

                        }

                    ]

                }}

            />

        </div>

    );

}