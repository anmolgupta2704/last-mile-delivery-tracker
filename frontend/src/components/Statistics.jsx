import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Statistics(){

const [stats,setStats]=useState({

total:0,

delivered:0,

pending:0,

failed:0

});

useEffect(()=>{

load();

},[]);

const load=async()=>{

const res=await API.get("/orders");

const orders=res.data.orders || res.data;

setStats({

total:orders.length,

delivered:orders.filter(o=>o.status==="Delivered").length,

pending:orders.filter(o=>o.status!=="Delivered" && o.status!=="Failed").length,

failed:orders.filter(o=>o.status==="Failed").length

});

};

return(

<div className="row">

<div className="col-md-3">

<div className="card bg-primary text-white p-3">

<h4>Total</h4>

<h2>{stats.total}</h2>

</div>

</div>

<div className="col-md-3">

<div className="card bg-success text-white p-3">

<h4>Delivered</h4>

<h2>{stats.delivered}</h2>

</div>

</div>

<div className="col-md-3">

<div className="card bg-warning p-3">

<h4>Pending</h4>

<h2>{stats.pending}</h2>

</div>

</div>

<div className="col-md-3">

<div className="card bg-danger text-white p-3">

<h4>Failed</h4>

<h2>{stats.failed}</h2>

</div>

</div>

</div>

);

}