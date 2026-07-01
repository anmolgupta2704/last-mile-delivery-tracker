const steps=[

"Created",

"Assigned",

"Picked Up",

"In Transit",

"Out For Delivery",

"Delivered"

];

export default function Progress({status}){

const current=steps.indexOf(status);

return(

<div className="d-flex justify-content-between my-4">

{

steps.map((step,index)=>(

<div
key={step}
className={

index<=current

?

"text-success"

:

"text-secondary"

}

>

{step}

</div>

))

}

</div>

);

}