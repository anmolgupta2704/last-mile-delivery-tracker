import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function Reschedule(){

const {id}=useParams();

const navigate=useNavigate();

const [date,setDate]=useState("");

const submit=async()=>{

try{

await API.patch(

`/orders/reschedule/${id}`,

{

date

}

);

toast.success("Rescheduled");

navigate("/dashboard");

}

catch(err){

toast.error("Failed");

}

}

return(

<div className="container mt-5">

<div className="card p-4">

<h2>Reschedule Delivery</h2>

<input

type="date"

className="form-control"

onChange={(e)=>setDate(e.target.value)}

/>

<button

className="btn btn-primary mt-3"

onClick={submit}

>

Confirm

</button>

</div>

</div>

);

}