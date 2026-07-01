import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import Statistics from "../components/Statistics";
import CreateOrder from "./CreateOrder";
import Orders from "./Orders";

export default function Dashboard(){

return(

<>

<Navbar/>

<div className="container mt-4">

<ProfileCard/>

<Statistics/>

<CreateOrder/>

<Orders/>

</div>

</>

);

}