export default function StatusBadge({status}){

const color={

Created:"secondary",

Assigned:"primary",

"Picked Up":"info",

"In Transit":"warning",

"Out For Delivery":"dark",

Delivered:"success",

Failed:"danger"

};

return(

<span

className={`badge bg-${color[status]}`}

>

{status}

</span>

);

}