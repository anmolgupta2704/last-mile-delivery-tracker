export default function DashboardCard({
    title,
    value,
    color,
    icon
}) {

    return (

        <div className="col-lg-3 col-md-6">

            <div
                className={`card border-0 shadow bg-${color} text-white h-100`}
                style={{borderRadius:"18px"}}
            >

                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>

                        <h6>{title}</h6>

                        <h2>{value}</h2>

                    </div>

                    <div>

                        {icon}

                    </div>

                </div>

            </div>

        </div>

    );

}