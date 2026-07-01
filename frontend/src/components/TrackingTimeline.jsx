export default function TrackingTimeline({ tracking }) {

    return (

        <div className="card mt-4">

            <div className="card-header">

                <h4>Tracking Timeline</h4>

            </div>

            <div className="card-body">

                {

                    tracking.length === 0 ?

                    <p>No Tracking Found</p>

                    :

                    tracking.map((item,index)=>(

                        <div
                            key={index}
                            className="border-start border-4 border-primary ps-3 mb-4"
                        >

                            <h5>{item.status}</h5>

                            <p>{item.remarks}</p>

                            <small>

                                {new Date(item.time).toLocaleString()}

                            </small>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}