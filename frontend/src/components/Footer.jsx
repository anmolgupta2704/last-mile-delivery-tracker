import { FaGithub, FaLinkedin, FaEnvelope, FaTruck } from "react-icons/fa";

export default function Footer() {

    return (

        <footer
            className="mt-5"
            style={{
                background:"#0f172a",
                color:"white"
            }}
        >

            <div className="container py-4">

                <div className="row">

                    <div className="col-md-6">

                        <h4>

                            <FaTruck className="me-2"/>

                            Last Mile Delivery

                        </h4>

                        <p className="text-light">

                            Smart Logistics &
                            Delivery Tracking Platform

                        </p>

                    </div>

                    <div className="col-md-3">

                        <h5>Quick Links</h5>

                        <ul className="list-unstyled">

                            <li>Dashboard</li>

                            <li>Orders</li>

                            <li>Tracking</li>

                            <li>Analytics</li>

                        </ul>

                    </div>

                    <div className="col-md-3">

                        <h5>Contact</h5>

                        <p>

                            <FaEnvelope className="me-2"/>

                            support@lastmile.com

                        </p>

                        <FaGithub
                            size={22}
                            className="me-3"
                        />

                        <FaLinkedin
                            size={22}
                        />

                    </div>

                </div>

                <hr/>

                <p className="text-center mb-0">

                    © 2026 Last Mile Delivery Tracker

                    <br/>

                    Developed by <b>Anmol Gupta</b>

                </p>

            </div>

        </footer>

    );

}